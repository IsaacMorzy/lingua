# Matt Pocock Skills & Loop-Engineering Workflows

> Step-by-step invocation guide for the engineering skills from `mattpocock/skills` and how they fit into the loop-engineering workflow for the `lingua` repository.

## Prerequisites

- Skills are installed at `~/.agents/skills/mattpocock`.
- Repo configuration is in `AGENTS.md`, `docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md`, and `docs/agents/domain.md`.
- GitHub project board: **IJLAPS Website** (project 6) under `IsaacMorzy/lingua`.

## Skill invocation patterns

### `/setup-matt-pocock-skills`

Run once per repo to configure the issue tracker, triage labels, and domain docs.

1. Read `git remote -v` to confirm the GitHub repo.
2. Read or create `AGENTS.md`.
3. Write `docs/agents/issue-tracker.md` — GitHub Issues via `gh` CLI.
4. Write `docs/agents/triage-labels.md` — canonical five-state labels.
5. Write `docs/agents/domain.md` — single-context layout with `CONTEXT.md` and `docs/adr/`.
6. Update `AGENTS.md` with the `## Agent skills` block.

### `/triage`

Move issues through the state machine.

1. Query open issues by label: `needs-triage`, `needs-info`, `ready-for-agent`.
2. Read the issue body, comments, and labels.
3. Verify the claim (reproduce bugs, review PR diffs).
4. Apply the outcome:
   - `ready-for-agent` — post an agent brief.
   - `ready-for-human` — note why it needs human judgment.
   - `needs-info` — post triage notes with actionable questions.
   - `wontfix` — close with explanation.
5. Record the action in `loop-run-log.md`.

### `/to-tickets`

Break a spec or conversation into tracer-bullet tickets.

1. Gather context from the spec or conversation.
2. Explore the codebase for domain vocabulary and ADRs.
3. Draft vertical slices with blocking edges.
4. Present the breakdown to the user for approval.
5. Publish one GitHub issue per ticket in dependency order.
6. Add issues to the IJLAPS Website project board.
7. Apply the `ready-for-agent` label unless told otherwise.

### `/implement`

Build an issue test-first with code review.

1. Read the issue/spec and `CONTEXT.md`.
2. Confirm seams with the user.
3. Write a failing test (red).
4. Write the minimal implementation (green).
5. Run typechecks and tests.
6. Use `/code-review` to review the work.
7. Commit to the current branch.

### `/code-review`

Review changes since a fixed point.

1. Pin the fixed point (commit, branch, or tag).
2. Identify the spec source (issue, PRD, or spec file).
3. Identify standards sources (`DESIGN.md`, `AGENTS.md`, coding standards).
4. Spawn two parallel sub-agents: **Standards** and **Spec**.
5. Aggregate findings under `## Standards` and `## Spec`.

### `/grill-with-docs` and `/domain-modeling`

Sharpen ideas and domain language.

1. Run a focused grilling session one question at a time.
2. Update `CONTEXT.md` and relevant ADRs as decisions land.
3. Record new terms in the domain glossary.

### `/handoff`

Compact context across sessions.

1. Summarize the current state, open decisions, and blockers.
2. Update `STATE.md` and append to `loop-run-log.md`.
3. List the next frontier tickets.

## Loop-engineering workflow

At the start of every run:

1. Read `STATE.md`.
2. Read `loop-constraints.md`.
3. Read the latest entry in `loop-run-log.md`.
4. Read `loop-budget.md` if budgets are tight.

At the end of every run:

1. Append a new entry to `loop-run-log.md`.
2. Update `STATE.md` if state changed.
3. Report the next frontier and any blockers.

## Human-task permissions

Agents may execute well-defined, reversible human tasks locally and on GitHub:

- Creating, updating, and closing GitHub issues and project board items.
- Applying triage labels and moving issues through state roles.
- Creating ADRs and updating `CONTEXT.md`.
- Running documented build/test commands.
- Making lightweight design decisions that do not alter core business logic.

Destructive or irreversible actions still require explicit user approval.

## Example: adding a new page

1. `/to-tickets` — create a ticket for the page.
2. `/implement` — build the page test-first.
3. `/code-review` — review the diff.
4. Update `STATE.md` and `loop-run-log.md`.
5. Move the GitHub issue to `ready-for-human` or close it.
