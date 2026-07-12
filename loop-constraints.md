# Loop Constraints

> Mandatory guardrail for all autonomous runs against the `lingua` repository.

## Start-of-run confirmation

Constraints loaded from `loop-constraints.md`: active rules below apply.

## Kill switches

- If `loop-pause-all` is set in this file or in `STATE.md`, exit immediately.
- If daily token cap in `loop-budget.md` is exceeded, switch to report-only mode.

## Editing rules

- Do **not** edit sensitive files: `.env`, `auth/`, `payments/`, `secrets/`, `credentials/`.
- Do **not** modify Frappe core or bench configuration.
- Do **not** delete existing DocTypes or tests without explicit user approval.
- Prefer additive changes; avoid breaking existing `Lingua Language` and `Lingua Level System` behavior.

## Human tasks

Agents may execute tasks that would traditionally be "human-only" — both locally in this project and remotely on GitHub — when the task is well-defined, reversible, and documented. Examples include:

- Creating, updating, and closing GitHub issues and project board items
- Applying triage labels and moving issues through state roles
- Creating ADRs and updating `CONTEXT.md`
- Running documented build/test commands
- Making lightweight design decisions that do not alter core business logic

Before executing a human task, the agent must:

1. Confirm the action in the current session.
2. Record the action in `loop-run-log.md`.
3. Update `STATE.md` if the task changes project state.

For destructive or irreversible actions (e.g., deleting DocTypes, merging to `main`, pushing to remote, changing production data), still obtain explicit user approval.

## Matt Pocock skills workflow

This repo uses the engineering skills from `mattpocock/skills`. Agents should follow these flows:

- `/setup-matt-pocock-skills` — configure issue tracker, triage labels, and domain docs
- `/triage` — move issues through triage roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`)
- `/to-tickets` — break specs into tracer-bullet tickets with blocking edges
- `/implement` — build an issue test-first with code review
- `/code-review` — review a diff against standards and spec
- `/grill-with-docs` — sharpen ideas by interview, updating `CONTEXT.md` and ADRs
- `/domain-modeling` — sharpen domain language and record ADRs
- `/handoff` — compact context across sessions

## Loop-engineering workflow

Agents operate in loops governed by:

- `STATE.md` — current focus, active issues, blockers, and recent decisions
- `loop-budget.md` — token and runtime budgets
- `loop-run-log.md` — historical log of actions and outcomes
- `loop-constraints.md` — this file

At the start of each run, read `STATE.md` and the latest `loop-run-log.md` entry. At the end of each run, append a new entry to `loop-run-log.md` and update `STATE.md` if state changed.

## Testing rules

- Run `bench --site <site> run-tests --app lingua` after Python changes.
- Run `npm run build` (inside the Astro frontend) after frontend changes.
- Limit to one fix attempt per run unless the user approves more.

## Push / merge rules

- Agents may push to feature branches and merge to `main` via `gh pr merge` when the PR is bounded to a single intended change AND the `code-reviewer-minimax-m3` sub-agent returns a **safe to merge** verdict (no HARD findings) on the PR diff.
- For actions beyond a single PR merge (deleting DocTypes, removing tests, schema migrations, production data changes, force-pushes) agents must still obtain explicit user approval per change.
- Escalate after three failed fix attempts.
- Never fast-forward or push directly to `main` — always go via a PR (preserve traceability, allow rollback via PR-revert).
- After a successful merge, delete the feature branch (for example via `gh pr merge --delete-branch`) so stale branches do not accumulate.

## Secret hygiene

- Never store credentials in shell RC files (`~/.bashrc`, `~/.zshrc`, `/etc/environment`), in `.env` files that are tracked, or in any tracked source file.
- Use `gh auth login --with-token` for credential rotation — it stores tokens in `~/.config/gh/hosts.yml` with 0700 permissions instead of leaking via process listings, `/proc/*/environ`, or Docker mounts.
- Any token that has appeared in a chat transcript, screen share, or pastebin is treated as compromised. Recommend revocation at https://github.com/settings/tokens; mint a fresh token and rotate via `gh auth login --with-token` from a local terminal, never from a chat.
- Repo-wide secret scan is a recommended pre-commit gate (grep for `ghp_*`, `AKIA*`, `AIza*`, `xox*`, `sk-*`, `-----BEGIN *PRIVATE KEY-----`, `password = '...'`).

## Safety defaults

- Do not disable tests.
- Do not expose secrets or credentials in code.
- Keep changes scoped to the current issue/vertical slice.
