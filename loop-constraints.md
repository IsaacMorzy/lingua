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

- Do **not** auto-merge to `main`.
- Require human approval before pushing to remote.
- Escalate after three failed fix attempts.

## Safety defaults

- Do not disable tests.
- Do not expose secrets or credentials in code.
- Keep changes scoped to the current issue/vertical slice.
