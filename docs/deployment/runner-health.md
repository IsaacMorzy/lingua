# Self-hosted Runner Health Check

> A 5-minute cron job that detects an offline self-hosted GitHub Actions runner and either restarts it (first failure) or opens a GitHub issue (still offline 30 minutes later). The deploy pipeline will silently fail if the runner is down — this script makes the failure visible.

## What it does

1. Every 5 minutes, the script queries `gh api repos/IsaacMorzy/lingua/actions/runners` and extracts the `status` field of the runner whose name contains `lingua-deploy`.
2. If the runner reports `online`, the script clears any cooldown state and exits.
3. If the runner reports `offline` (or the API fails, or the runner is missing), the script:
   - **First failure**: records the timestamp, runs `sudo /home/grand/actions-runner/svc.sh restart`, and exits. The next 5-minute tick verifies recovery.
   - **Still offline 30+ min later** (cooldown): opens a deduplicated GitHub issue on `IsaacMorzy/lingua` with the title `🚨 Self-hosted runner lingua-deploy is OFFLINE` and a body containing triage instructions.
4. Every action logs to syslog via `logger -t runner-health`. Grep with:
   ```bash
   journalctl -t runner-health --since "1 hour ago"
   ```

## Where it lives

- **Source (tracked)**: `apps/lingua/deployment/runner-health.sh` in this repo.
- **Installed (server)**: `/home/grand/actions-runner/health-check.sh` (mode `0700`, owned by `grand:grand`).
- **State (server)**: `/var/lib/runner-health/last-restart` (mtime = unix timestamp of the last restart attempt; cleared automatically when the runner comes back online).

## One-time setup on the production server

1. **Install the script** (after PR merge):
   ```bash
   sudo install -o grand -g grand -m 0700 \
     /home/grand/frappe-bench/apps/lingua/deployment/runner-health.sh \
     /home/grand/actions-runner/health-check.sh
   ```

2. **Add a NOPASSWD sudo rule** for the runner restart (append to `/etc/sudoers.d/lingua-deploy`):
   ```bash
   sudo tee -a /etc/sudoers.d/lingua-deploy >/dev/null <<'EOF'
   grand ALL=(ALL) NOPASSWD: /home/grand/actions-runner/svc.sh restart
   EOF
   sudo chmod 0440 /etc/sudoers.d/lingua-deploy
   sudo visudo -c -f /etc/sudoers.d/lingua-deploy
   ```

3. **Install the cron job** (`/etc/cron.d/runner-health`):
   ```bash
   sudo tee /etc/cron.d/runner-health >/dev/null <<'EOF'
   # /etc/cron.d/runner-health
   # Run runner health check every 5 minutes as user grand.
   SHELL=/bin/bash
   PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
   */5 * * * * grand /home/grand/actions-runner/health-check.sh >/dev/null 2>&1
   EOF
   sudo chmod 0644 /etc/cron.d/runner-health
   ```

4. **Create the state directory** (also created on first run by the script itself):
   ```bash
   sudo mkdir -p /var/lib/runner-health
   sudo chown grand:grand /var/lib/runner-health
   ```

## Test plan

The script is safe to run by hand. Two test cases, both reversible:

### 1. Basic recovery (auto-restart)

```bash
# 1a. Force the runner offline by stopping the systemd service.
sudo systemctl stop 'actions.runner.*'

# 1b. Run the health check manually. It should detect offline, log a restart attempt, and (since the service is stopped) succeed in bringing it back.
sudo -u grand /home/grand/actions-runner/health-check.sh

# 1c. Verify the service is back.
sudo systemctl status 'actions.runner.*'

# 1d. Verify the cooldown state file was written.
/var/lib/runner-health/last-restart  # should exist with a recent mtime
ls -la /var/lib/runner-health/

# 1e. Confirm GitHub-side status is back to online.
gh api repos/IsaacMorzy/lingua/actions/runners --jq '.runners[] | select(.name | contains("lingua-deploy")) | .status'
```

### 2. Cooldown + alert (open GitHub issue)

```bash
# 2a. Force the runner offline AND break the sudo restart so the cooldown path runs.
sudo systemctl stop 'actions.runner.*'
# (temporarily revoke the sudo rule to simulate a broken restart)
sudo chmod 0440 /etc/sudoers.d/lingua-deploy.bak 2>/dev/null || true
sudo cp /etc/sudoers.d/lingua-deploy /etc/sudoers.d/lingua-deploy.bak
echo '# disabled for test' > /etc/sudoers.d/lingua-deploy

# 2b. Run the health check twice (or wait 5 min between runs).
sudo -u grand /home/grand/actions-runner/health-check.sh
# ... wait 5 min, or manually fudge the state file:
echo "0" > /var/lib/runner-health/last-restart  # force cooldown expiry
sudo -u grand /home/grand/actions-runner/health-check.sh

# 2c. Verify the GitHub issue was opened.
gh issue list --repo IsaacMorzy/lingua --state open --search "lingua-deploy is OFFLINE in:title"

# 2d. Restore the sudo rule and start the service.
sudo cp /etc/sudoers.d/lingua-deploy.bak /etc/sudoers.d/lingua-deploy
sudo chmod 0440 /etc/sudoers.d/lingua-deploy
sudo systemctl start 'actions.runner.*'

# 2e. Confirm the runner comes back and the cooldown state is cleared.
sudo -u grand /home/grand/actions-runner/health-check.sh
gh api repos/IsaacMorzy/lingua/actions/runners --jq '.runners[] | select(.name | contains("lingua-deploy")) | .status'
```

## Pitfalls

- **`gh` token expiry**: if the `gh` CLI's stored token expires, the API call fails, the script logs an error and creates a cooldown issue. The issue body will not have the same "auto-restart failed" context (because the API call itself failed), but the alert is still raised. To recover, run `gh auth login --with-token` on the server with a fresh fine-grained PAT.
- **Race with `bench migrate`**: the runner can briefly appear offline during a deploy while the runner process is being upgraded (e.g., after `./run.sh` self-updates). The 30-minute cooldown absorbs this — the next tick will see the runner back online and clear the state file.
- **Multiple runners with the same tag**: the `select(.name | contains("lingua-deploy"))` filter matches any runner whose name contains the tag. If a second `lingua-deploy-*` runner is added, the script will see both. Use a more specific filter (`select(.name == "lingua-deploy-morzy.kenyaschooloflanguages.ac.ke")`) if that becomes a concern.
- **State file in `/var/lib`**: persistent across reboots. If the server reboots and the runner takes a while to come back, the cooldown timer is still in effect — which is the correct behaviour (avoid flapping after a reboot).
