# Agent Instructions

> Shared instructions for AI agents working in the `lingua` repository.

## Agent skills

### Issue tracker

Issues live in the GitHub repo `IsaacMorzy/lingua` and are managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

Agents may create, update, close, and link issues; add/remove labels; and add issues to the IJLAPS Website project board. Record significant tracker actions in `loop-run-log.md`.

### Triage labels

The canonical triage labels are: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: one `CONTEXT.md` at the repo root and ADRs under `docs/adr/`. See `docs/agents/domain.md`.

## Matt Pocock skills

This repository is configured to use the engineering skills from `mattpocock/skills`. Key flows:

- `/setup-matt-pocock-skills` — configure issue tracker, triage labels, and domain docs
- `/triage` — move issues through triage roles
- `/to-tickets` — break specs into tracer-bullet tickets
- `/implement` — build an issue test-first with code review
- `/code-review` — review a diff against standards and spec
- `/grill-with-docs` — sharpen ideas by interview, updating `CONTEXT.md` and ADRs
- `/domain-modeling` — sharpen domain language and record ADRs
- `/handoff` — compact context across sessions

When invoked, load the relevant skill from `~/.agents/skills/mattpocock/skills/engineering/<skill>/SKILL.md` and follow its process.

## Loop-engineering workflow

This repository uses a loop-engineering workflow. At the start of every run, read:

- `STATE.md` — current focus and active issues
- `loop-budget.md` — token/runtime budgets
- `loop-constraints.md` — guardrails and human-task permissions
- Latest entry in `loop-run-log.md`

At the end of every run, append a new entry to `loop-run-log.md` and update `STATE.md` if state changed.

## Human tasks

Agents may execute tasks that would traditionally be "human-only" — both locally in this project and remotely on GitHub — when the task is well-defined, reversible, and documented. Examples include:

- Creating, updating, and closing GitHub issues and project board items
- Applying triage labels and moving issues through state roles
- Creating ADRs and updating `CONTEXT.md`
- Running documented build/test commands
- Making lightweight design decisions that do not alter core business logic

Before executing a human task:

1. Confirm the action in the current session.
2. Record the action in `loop-run-log.md`.
3. Update `STATE.md` if the task changes project state.

For destructive or irreversible actions beyond a single reviewed PR merge (deleting DocTypes, removing tests, schema migrations, production data changes, force-pushes), obtain explicit user approval first. Push to feature branches and merge to `main` via a PR are allowed when the `code-reviewer-minimax-m3` sub-agent returns a **safe to merge** verdict on the PR (see `loop-constraints.md` Push / merge rules).
