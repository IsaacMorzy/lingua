# Deployment Secrets

> How to provision the GitHub Actions secrets consumed by `.github/workflows/deploy-frontend.yml`, plus the corresponding local server-side credentials.

This document closes the operations half of issue #33 ("Frontend deployment automation"). The deploy workflow itself is already on `main`, plus the nginx config + local script; what remained was the operator-facing playbook for provisioning the four secrets it needs.

## Architecture: self-hosted runner (2026-07-13)

The deploy workflow no longer runs on a GitHub-hosted runner. A **self-hosted runner** is installed on the production server itself (`/home/grand/actions-runner`, running as user `grand` under systemd), and the `deploy` job targets it with `runs-on: [self-hosted, linux, x64, lingua-deploy]`. Because the runner is on the same machine as the bench, the deploy step is a local `rsync` + `bench build` + `sudo nginx -t` + `sudo systemctl reload nginx` — no SSH, no remote host key, no public-network SSH exposure.

The `build` job stays on `ubuntu-latest` (fast, isolated). Artifacts flow build → deploy via the `lingua-www` upload/download artifact pair.

This means the public firewall (UFW) can keep SSH (port 4122) restricted to the Tailscale interface only — no public port forwarding is required for the deploy to work.

## Required GitHub Actions secrets

The deploy workflow (`.github/workflows/deploy-frontend.yml`) no longer reads the four legacy secrets at runtime. They remain in the repo for **emergency SSH access only** and may be removed once the operator is comfortable relying solely on the self-hosted runner path.

| Secret name       | Status         | Purpose                                                                                                              |
|-------------------|----------------|----------------------------------------------------------------------------------------------------------------------|
| `DEPLOY_SSH_KEY`  | **legacy**     | Was used to authenticate the GitHub-hosted runner. Kept for emergency SSH; the workflow no longer references it.       |
| `DEPLOY_HOST_KEY` | **legacy**     | Was the `ssh-keyscan` line for strict host-key checking. Kept for emergency SSH; the workflow no longer references it. |
| `DEPLOY_HOST`     | **legacy**     | Was the rsync/ssh target. Kept for emergency SSH; the workflow no longer references it.                                |
| `DEPLOY_USER`     | **legacy**     | Was the unix account for rsync/ssh. Kept for emergency SSH; the workflow no longer references it.                    |

If you also want to keep the on-server `~/.ssh/lingua_deploy_ed25519` keypair around, see "Emergency SSH access" below. Otherwise it can be deleted along with the four secrets.

## Self-hosted runner setup (one-time, on the production server)

The runner runs as the same user that owns the bench (`grand`) so it inherits:
- Read/write access to `/home/grand/frappe-bench/apps/lingua/lingua/{www,public/frontend}`
- The existing `sudo` drop-in (nginx + systemctl + bench) — **see "Sudo configuration" below for the minimal set the workflow needs**
- Tailscale network membership (the runner talks to the GitHub API over the Tailscale interface, but it also works over the public interface because the runner registration uses HTTPS outbound to `pipelinesghubeus5.azureedge.net`).

1. **Download the latest official runner** to `/home/grand/actions-runner`:

   ```bash
   sudo mkdir -p /home/grand/actions-runner && sudo chown grand:grand /home/grand/actions-runner
   cd /home/grand/actions-runner
   RUNNER_VERSION=$(curl -sL https://api.github.com/repos/actions/runner/releases/latest | python3 -c 'import sys, json; print(json.load(sys.stdin)["tag_name"].lstrip("v"))')
   curl -fsSL -o runner.tar.gz "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"
   tar xzf runner.tar.gz && rm runner.tar.gz
   ```

2. **Mint a short-lived registration token** from the GitHub API (valid 1 hour):

   ```bash
   gh api -X POST repos/IsaacMorzy/lingua/actions/runners/registration-token --jq .token
   ```

3. **Configure the runner** with the labels the deploy job targets:

   ```bash
   ./config.sh --url https://github.com/IsaacMorzy/lingua \
     --token "$TOKEN" \
     --name "lingua-deploy-$(hostname)" \
     --labels self-hosted,linux,x64,lingua-deploy \
     --work _work \
     --unattended --replace
   ```

   `--replace` lets you re-run the step if the runner was previously registered under the same name. The four labels (`self-hosted,linux,x64,lingua-deploy`) are matched as a logical AND by the workflow's `runs-on: [self-hosted, linux, x64, lingua-deploy]`; keep the set narrow so future jobs in the repo don't accidentally land on this production runner.

4. **Install and start as a systemd service** (runs as user `grand`):

   ```bash
   sudo ./svc.sh install grand
   sudo ./svc.sh start
   ```

   Verify:
   ```bash
   sudo systemctl status 'actions.runner.*' --no-pager
   gh api repos/IsaacMorzy/lingua/actions/runners --jq '.runners[] | {name, status, labels: [.labels[].name]}'
   ```

5. **Auto-update (recommended)**. The official runner has `./run.sh` self-update behaviour on start. To pin a stable release, keep the runner directory readable only by `grand` and rely on the standard upgrade path (download a newer tarball, extract, restart `sudo ./svc.sh restart`).

## Sudo configuration

The runner needs three NOPASSWD sudo rules — drop them into `/etc/sudoers.d/lingua-deploy` on the server:

```bash
sudo tee /etc/sudoers.d/lingua-deploy >/dev/null <<'EOF'
grand ALL=(ALL) NOPASSWD: /usr/sbin/nginx -t
grand ALL=(ALL) NOPASSWD: /usr/bin/systemctl reload nginx
grand ALL=(ALL) NOPASSWD: /usr/local/bin/bench
EOF
sudo chmod 0440 /etc/sudoers.d/lingua-deploy
```

`bench migrate` is intentionally **not** granted to the runner — the corresponding workflow step is `if: false` and is only uncommented in a separate human-approved PR after a manual review.

## Emergency SSH access (optional)

If you want to keep the old `DEPLOY_*` secrets and the on-server `lingua_deploy_ed25519` keypair for break-glass SSH, the provisioning steps from earlier revisions of this document still apply (generate keypair, append to `authorized_keys`, paste private key into the secret). The deploy workflow does not need them, so this is purely for human-driven emergency access.

## Local credentials (NEVER commit)

The runner's working directory is `/home/grand/actions-runner/_work` and its service unit is `/etc/systemd/system/actions.runner.<org>-<repo>.<runner-name>.service`. Both are out-of-repo. The deploy keypair (if retained for emergency access) is in `~grand/.ssh/lingua_deploy_ed25519` with `chmod 600`. None of these are tracked by `git`.

## Security model

- The deploy job runs on a runner the operator controls, not on GitHub-hosted infrastructure. The runner has the same filesystem and sudo access as the `grand` user — equivalent to giving the operator themselves push access to the repo, which they already have.
- No raw credentials are committed to the repository. The four legacy `DEPLOY_*` secrets are no longer referenced by the workflow and can be removed if the operator no longer needs break-glass SSH.
- The deploy workflow **deliberately excludes `pull_request`** triggers — only `push: branches: [main]` and `workflow_dispatch` fire it. Fork PRs cannot trigger a deploy even with the workflow file edited.
- The bench-migrate step is gated `if: false` so a frontend-only push never touches the database schema. Activation requires a separate human-approved PR that uncomments the step and (if needed) extends the sudo drop-in.
- The runner registers against the public GitHub Actions service over HTTPS; it does not require inbound firewall rules.

## Local credentials (NEVER commit)

Two local credentials live outside the repository:

- The production server's `/etc/sudoers.d/lingua-deploy` file (see step 5).
- The `lingua_deploy_ed25519` private key, restricted to the deploy user (`chmod 600`).

Both are excluded from `git ls-files` and from any `secrets.*` reference in the workflow. They cannot be exfiltrated through the repository.

## Security model

- All deploy-time credentials flow through GitHub Secrets; the repository holds zero raw secrets.
- The deploy workflow **deliberately excludes `pull_request`** triggers — only `push: branches: [main]` and `workflow_dispatch` fire it. Fork PRs cannot trigger a deploy even with the workflow file edited.
- The bench-migrate step is gated `if: false` so a frontend-only push never touches the database schema. Activation requires a separate human-approved PR that uncomments the step.
- `webfactory/ssh-agent@v0.9.0` receives `DEPLOY_SSH_KEY` via `secrets.DEPLOY_SSH_KEY` only — never via env substitution in a non-secret context.
- `log-public-key: false` is set on the ssh-agent action so the private key fingerprint is not echoed into the GitHub Actions log.

## Personal access token hygiene

The same hygiene rules from `loop-constraints.md` apply to whatever credential is used to push commits and call `gh`:

- Use **fine-grained personal access tokens** scoped to **only** the `IsaacMorzy/lingua` repository.
- Grant only the specific permissions needed for the routine agent workflow: `Contents: Read+Write`, `Pull requests: Read+Write`, `Issues: Read+Write`, `Projects: Read+Write`, `Workflows: Read+Write`. **Do not** request `admin:org`, `delete_repo`, `packages:write`, or broad org-level `workflows` for routine work.
- Provision tokens through `gh auth login --with-token` — it stores the value in `~/.config/gh/hosts.yml` with 0700 permissions, instead of leaking via shell rc files, `/proc/*/environ`, or Docker mounts.
- A token that has appeared in a chat transcript, screen share, or pastebin is treated as compromised regardless of subsequent action. Revoke it at https://github.com/settings/tokens immediately.

This file intentionally does not store any credential value. The four secrets above are pasted into the GitHub UI by an authorised maintainer who already controls the production host.

## Disaster recovery

| Incident                                                        | Action                                                                                                                                              |
|-----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `DEPLOY_SSH_KEY` leak                                           | Revoke the public key from `~/.ssh/authorized_keys` on the production server. Generate a fresh keypair per step 1; rotate the secret.               |
| `DEPLOY_HOST_KEY` rotation (the server's host key changes)       | Re-run `ssh-keyscan` against the new host and paste the result into the secret. No workflow changes required.                                       |
| Deploy user account compromised                                 | Generate a new keypair, update `authorized_keys`, rotate `DEPLOY_SSH_KEY`. Audit `/var/log/nginx/ijlaps.ac.ke.*.log` for unknown source IPs.       |
| Secret value mistakenly committed to the repo                    | Revoke immediately at github.com. Rotate per row above. Open a post-mortem issue tracking the leak surface.                                         |
| Personal access token pasted into chat, log, or pastebin        | Revoke at https://github.com/settings/tokens. Mint a new fine-grained token with the reduced scope listed above. Run `gh auth login --with-token` from a local terminal, never from a chat. |

## Cross-references

- Workflow file: `.github/workflows/deploy-frontend.yml`
- Nginx site config: `deployment/nginx/ijlaps.ac.ke.conf`
- Local deploy script: `deployment/deploy-frontend.sh`
- Self-hosted runner directory: `/home/grand/actions-runner` (on the production server)
- Systemd service: `actions.runner.IsaacMorzy-lingua.lingua-deploy-*.service`
- Tracking issue: `GitHub #33 — Frontend deployment automation (deploy-frontend.yml + nginx + script)` (label `ready-for-human` until the self-hosted runner is registered and the four legacy secrets are reconciled)
- Loop-engineering policy: `loop-constraints.md` Secret hygiene section
- Agent instructions: `AGENTS.md` Human-tasks section
