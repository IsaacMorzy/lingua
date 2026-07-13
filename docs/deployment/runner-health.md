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

The cooldown path fires when **all three** are true: the runner is offline, the state file `last-restart` exists, and `(now - last-restart) < 30 min`. The state file is created by the first-detection path on every offline tick. So the simplest test is: stop the service → break the sudo restart → run the health check TWICE (first tick records the timestamp, second tick sees the recent timestamp + offline + fails-closed restart = opens issue).

Note: setting the state file to `0` does NOT exercise the cooldown path. The script checks `LAST_RESTART > 0`, so `0` falls through to the first-detection branch (tries restart, records new timestamp). To force cooldown, the value must be > 0 AND `(now - value) < 30 min`. The natural way to reach that state is to let the first-detection branch write it.

```bash
# 2a. Find the exact service name (the glob 'actions.runner.*' is unreliable).
SVC=$(sudo systemctl list-unit-files --type=service --all | awk '/actions.runner/ {print $1; exit}')
echo "service: $SVC"

# 2b. Stop the runner and break the sudo restart rule so the first-detection path fails.
sudo systemctl stop "$SVC"
sudo cp /etc/sudoers.d/lingua-deploy /etc/sudoers.d/lingua-deploy.bak
printf '# disabled for test\n' | sudo tee /etc/sudoers.d/lingua-deploy >/dev/null
sudo visudo -c -f /etc/sudoers.d/lingua-deploy

# 2c. First tick: state file is empty, first-detection branch runs. Records timestamp, tries restart (fails because sudo is broken). State file now exists with a recent timestamp.
sudo -u grand /home/grand/actions-runner/health-check.sh
echo "state file after 1st run:"
ls -la /var/lib/runner-health/last-restart
cat /var/lib/runner-health/last-restart
echo " (interpreted: $(date -d @$(cat /var/lib/runner-health/last-restart) -u +%Y-%m-%dT%H:%M:%SZ))"

# 2d. Second tick: state file is recent, runner is still offline, sudo is still broken -> cooldown branch opens a deduplicated GitHub issue.
sudo -u grand /home/grand/actions-runner/health-check.sh

# 2e. Verify the GitHub issue was opened (and is the only one with this title).
gh issue list --repo IsaacMorzy/lingua --state open --search "lingua-deploy is OFFLINE in:title"

# 2f. Third tick: should DEDUPLICATE (not open a second issue).
sudo -u grand /home/grand/actions-runner/health-check.sh
gh issue list --repo IsaacMorzy/lingua --state open --search "lingua-deploy is OFFLINE in:title" --json number --jq 'length'

# 2g. Restore the sudo rule and start the service.
sudo cp /etc/sudoers.d/lingua-deploy.bak /etc/sudoers.d/lingua-deploy
sudo chmod 0440 /etc/sudoers.d/lingua-deploy
sudo visudo -c -f /etc/sudoers.d/lingua-deploy
sudo systemctl start "$SVC"

# 2h. Wait for GitHub to register online, then run the health check to clear the state file.
for i in 1 2 3 4 5 6 7 8; do
  sleep 10
  STATUS=$(gh api repos/IsaacMorzy/lingua/actions/runners --jq '.runners[] | select(.name | contains("lingua-deploy")) | .status' 2>/dev/null)
  echo "  t=$((i*10))s: status=$STATUS"
  [ "$STATUS" = "online" ] && break
done
sudo -u grand /home/grand/actions-runner/health-check.sh
ls -la /var/lib/runner-health/  # state file should be gone

# 2i. Close the test issue (mark as not planned, leave a test comment).
ISSUE=$(gh issue list --repo IsaacMorzy/lingua --state open --search "lingua-deploy is OFFLINE in:title" --json number --jq '.[0].number')
[ -n "$ISSUE" ] && gh issue close "$ISSUE" --comment "Cooldown-path test of /home/grand/actions-runner/health-check.sh — see STATE.md and docs/deployment/runner-health.md."
```

**Expected results from the 2026-07-13 run**:
- After 2c: state file `last-restart` exists, value is a unix timestamp from a few seconds ago.
- After 2d: syslog shows `Runner still offline within 30m cooldown... Alert issue already open... Skipping.` (in earlier test runs) or opens a new issue (in clean runs).
- After 2f: open issue count is 1 (dedup works).
- After 2h: runner is `online` on GitHub, state file is removed.

## Pitfalls

- **`gh` token expiry**: if the `gh` CLI's stored token expires, the API call fails, the script logs an error and creates a cooldown issue. The issue body will not have the same "auto-restart failed" context (because the API call itself failed), but the alert is still raised. To recover, run `gh auth login --with-token` on the server with a fresh fine-grained PAT.
- **Race with `bench migrate`**: the runner can briefly appear offline during a deploy while the runner process is being upgraded (e.g., after `./run.sh` self-updates). The 30-minute cooldown absorbs this — the next tick will see the runner back online and clear the state file.
- **Multiple runners with the same tag**: the `select(.name | contains("lingua-deploy"))` filter matches any runner whose name contains the tag. If a second `lingua-deploy-*` runner is added, the script will see both. Use a more specific filter (`select(.name == "lingua-deploy-morzy.kenyaschooloflanguages.ac.ke")`) if that becomes a concern.
- **State file in `/var/lib`**: persistent across reboots. If the server reboots and the runner takes a while to come back, the cooldown timer is still in effect — which is the correct behaviour (avoid flapping after a reboot).
