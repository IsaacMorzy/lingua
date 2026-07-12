# Deployment Secrets

> How to provision the GitHub Actions secrets consumed by `.github/workflows/deploy-frontend.yml`, plus the corresponding local server-side credentials.

This document closes the operations half of issue #33 ("Frontend deployment automation"). The deploy workflow itself is already on `main`, plus the nginx config + local script; what remained was the operator-facing playbook for provisioning the four secrets it needs.

## Required GitHub Actions secrets

The deploy workflow (`.github/workflows/deploy-frontend.yml`) reads four secrets at runtime. They live under **Repository Settings → Secrets and variables → Actions** in `IsaacMorzy/lingua`. No raw credentials are committed to the repository.

| Secret name       | Type                  | Purpose                                                                                                              |
|-------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------|
| `DEPLOY_SSH_KEY`  | SSH private key (PEM) | Authenticates the deploy user to the production server for `rsync` and `ssh` steps.                                  |
| `DEPLOY_HOST_KEY` | SSH known_hosts line  | One line from `ssh-keyscan ijlaps.ac.ke`; binds `webfactory/ssh-agent@v0.9.0` to the host without fingerprint prompts. |
| `DEPLOY_HOST`     | DNS host or IP        | Target for `rsync` and `ssh`. Currently `ijlaps.ac.ke`.                                                              |
| `DEPLOY_USER`     | Unix username         | The non-root account that owns `/home/grand/frappe-bench` on the production server.                                   |

## Step-by-step provisioning

1. **Generate the SSH key pair on the production server** (as the deploy user, not root — and only for this workflow):

   ```bash
   ssh-keygen -t ed25519 \
     -C 'lingua-deploy@ijlaps.ac.ke' \
     -f ~/.ssh/lingua_deploy_ed25519 \
     -N ''
   ```

   Empty passphrase is intentional — the runner cannot type one interactively. Use a dedicated keypair for this workflow; do not reuse `~/.ssh/id_*`.

2. **Append the public key to the deploy user's `authorized_keys`**:

   ```bash
   cat ~/.ssh/lingua_deploy_ed25519.pub >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

3. **Capture the private key for `DEPLOY_SSH_KEY`** — copy the entire PEM block including the `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----` markers:

   ```bash
   cat ~/.ssh/lingua_deploy_ed25519
   ```

4. **Run `ssh-keyscan` to capture the host fingerprint for `DEPLOY_HOST_KEY`**:

   ```bash
   ssh-keyscan -p 4122 -t ed25519,ecdsa,rsa ijlaps.ac.ke
   ```

   Copy the matching line(s) verbatim. If the server advertises multiple key types, include one line per type — the runner will accept any of them.

   **Note:** The production server's SSH daemon listens on **port 4122**, not the default 22. The `-p 4122` flag is required; without it, `ssh-keyscan` will silently time out and the resulting `DEPLOY_HOST_KEY` will be empty, breaking the workflow's strict host-key check. `ssh-keyscan` will write the known_hosts entry in `[hostname]:port` bracket form, which is the format the SSH client expects when connecting via a non-default port.

5. **Configure passwordless sudo for the deploy user** so the workflow's `sudo nginx -t && sudo systemctl reload nginx` and `bench build` steps succeed:

   ```bash
   sudo tee /etc/sudoers.d/lingua-deploy >/dev/null <<'EOF'
   lingua-deploy ALL=(ALL) NOPASSWD: /usr/sbin/nginx -t
   lingua-deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl reload nginx
   lingua-deploy ALL=(ALL) NOPASSWD: /usr/local/bin/bench
   EOF
   sudo chmod 0440 /etc/sudoers.d/lingua-deploy
   ```

   Limit sudo to the three commands the workflow actually invokes. `bench migrate` is intentionally **not** granted — schema migrations are run manually after a separate human-approved PR.

6. **Provision the four secrets** in the GitHub repo settings UI under Secrets and variables → Actions. Paste:
   - `DEPLOY_SSH_KEY` ← output of step 3
   - `DEPLOY_HOST_KEY` ← output of step 4
   - `DEPLOY_HOST` ← DNS name (e.g. `ijlaps.ac.ke`)
   - `DEPLOY_USER` ← unix account name (e.g. `lingua-deploy`)

7. **First deploy** runs automatically on the next push to `main` once the workflow file is merged. The `concurrency: group: deploy-frontend, cancel-in-progress: true` setting prevents overlapping deploys from a fast-follow-up push.

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
- Tracking issue: `GitHub #33 — Frontend deployment automation (deploy-frontend.yml + nginx + script)` (label `ready-for-human` until the four secrets are provisioned)
- Loop-engineering policy: `loop-constraints.md` Secret hygiene section
- Agent instructions: `AGENTS.md` Human-tasks section
