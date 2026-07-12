# Loop Run Log

> Historical log of autonomous runs against `lingua`.

```json
[
  {
    "date": "2026-07-12",
    "focus": "Gate relaxation + PR #30 merge to main",
    "actions": [
      "Operator request: loosen the gates so agents can work on human tasks in production GitHub issues + the IJLAPS Website project + locally; continue with commit + push + merge to main.",
      "Updated `loop-constraints.md`: Push / merge rules now allow agents to push feature branches and merge to `main` via `gh pr merge` when the `code-reviewer-minimax-m3` sub-agent returns a `safe to merge` verdict. Added Secret hygiene section: never store PATs in shell rc / tracked .env; tokens exposed in chat are compromised.",
      "Updated `AGENTS.md`: destructive-action clause now scopes explicit-approval requirement to actions beyond a single reviewed PR merge (DocType deletion, test removal, schema migrations, production data changes, force-pushes).",
      "PR #30 is now MERGED on `upstream/main` (merge commit `4891923`). The 2 PR-commit history (`b8f6436` design + test; `6a12c39` ops infra) builds clean (84 pages, ~5.08s) and vitest 8/8 pass.",
      "Feature branch `chore/jul-2026-sweep-export` cleanup complete: deleted locally via `git branch -D` after the merge --delete-branch on GitHub.",
      "Recovery step: PR #30 had already been merged (the earlier basher output reported 'not merged' as a false negative). Reset local `main` to `upstream/main` via `git reset --hard`. Re-applied the constraint edits on the correct base (script-based str_replace earlier landed on the feature branch by mistake — recovered by reset + re-edit).",
      "All 4 new tracking issues (#31 vitest, #32 mobile CI, #33 deploy, #34 icons) confirmed on project 6 via `gh project item-list`.",
      "Operating model from this point forward: agents push feature branches + merge PRs to main when the code-reviewer verdict is `safe to merge`. DocType / schema / production-data changes still require per-action explicit approval."
    ],
    "outcome": "PR #30 merged to main. Gates loosened per operator direction. STATE.md, loop-run-log.md, loop-constraints.md, AGENTS.md updated on main tip. Build green (84 pages), vitest 8/8 pass. PAT exposure flagged."
  },
  {
    "date": "2026-07-12",
    "focus": "Export jul-2026 sweep chain to a feature branch + PR + tracking issues + triage pass",
    "actions": [
      "Detected PAT (ghp_4o...) exposed in chat: treated as compromised, flagged user to revoke on github.com; gh CLI already authenticated as IsaacMorzy with repo/workflow/project scopes so no token write to ~/.bashrc or .env was needed (refused: 'store token in global env' as written by user; safer alternative accepted).",
      "Per loop-constraints.md and AGENTS.md, asked user for explicit approval on: auth strategy (chose gh auth login --with-token path, defaulted to existing session auth), push destination (chose 'commit + PR via feature branch', not direct push to main), issue scope (chose 'track new untracked work'), workflows (chose '/triage on open issues').",
      "Pre-checks: Node v22.23.1; gh auth status OK; git identity set to Isaac Morzy <musyokaisaac98@gmail.com>; secret scan across deployment/ and .github/workflows/ clean; existing frontend/.env already gitignored.",
      "Pre-commit hygiene: added frontend/test-results/ and tests/.last-run.json to .gitignore so Playwright build artifacts are not committed.",
      "Build verification: npm run build -> 84 pages in 5.08s; npx vitest run -> 8/8 button.test.ts pass in 501ms.",
      "Manual review of high-risk files: verdi safe to commit and push to a feature branch.",
      "Staged all 61 changed files via git add -A; explicitly excluded frontend/test-results/ via .gitignore; no secrets in the diff.",
      "Feature branch: chore/jul-2026-sweep-export (off main, tracking upstream/main at a9b1b4f).",
      "Commit 1: b8f6436 chore(design+test): jul-2026 9-sweep design pass + vitest + mobile CI",
      "Commit 2: 6a12c39 chore(infra+ops): frontend deployment automation + state docs",
      "Push: git push -u upstream chore/jul-2026-sweep-export -> succeeded.",
      "PR #30 opened: https://github.com/IsaacMorzy/lingua/pull/30",
      "Tracking issues created (4): #31 vitest / #32 mobile / #33 deploy / #34 icons. All body text written to /tmp/issue{n}.md and loaded via --body-file.",
      "Triage comments posted on #11 (level system viewer) and #13 (Frappe REST API): both retain enhancement / ready-for-human labels.",
      "gh project item-add --project-number 6 was rejected (unknown flag on gh 2.45.0) — issues were subsequently added via positional `gh project item-add 6 --owner IsaacMorzy --url <issue_url>`.",
      "STATE.md updated with active branch + PR + new issues + caveats (later included in the merged PR's 6a12c39 commit).",
      "Loop-run-log entry appended later in this session when the gate-relaxation follow-up committed the new content to main."
    ],
    "outcome": "PR #30 ready for review. 4 tracking issues created. #11 and #13 triaged. Build, vitest, secret scan, manual review all clean. PAT exposure flagged; gh CLI auth path unaffected. Auto-merge deferred per AGENTS.md gate (later relaxed in this same run)."
  },
  {
    "date": "2026-07-11",
    "focus": "Vitest setup for CVA factory + override test after 3 iteration rounds",
    "actions": [
      "Added vitest@^2.1.9 to frontend/devDependencies. Added two scripts to package.json: `test:unit: vitest run` (single run) and `test:unit:watch: vitest` (watch mode for dev).",
      "Created `frontend/vitest.config.ts` with the @ alias pointing to ./src (matches tsconfig.json), `include: ['tests/unit/**/*.test.ts']`, `environment: 'node'`.",
      "Created `frontend/tests/unit/button.test.ts` with 8 focused tests covering the CVA factory's compound variants: inverted uses on-dark focus ring (not on-light), primary fill/outline tokens, danger/success variant tokens, iconOnly size:md square, size:lg svg icon sizing.",
      "Override test went through 3 iterations to settle on a single honest assertion: substring quirk in CSS variable names, twMerge did not strip the on-dark class, stylesheet source-order is the real cascade mechanism.",
      "Tests: 8/8 pass in 514ms. Build: 84 pages in 5.45s, 0 errors."
    ],
    "outcome": "Build clean (84 pages, 5.45s). Unit test infrastructure in place (vitest 2.1.9, 8 tests, 514ms). Final override test is honest about its scope and does not pretend to assert the cascade."
  }
]
```

The Vodafone-red migration flipped the design system from blue (`#1e40af`) to signature red. Most class utilities now route through Tailwind v4 tokens declared in `@theme` inside `frontend/src/styles/global.css`. Two manual exceptions remain visible after automation:

1. On `bg-primary` (red) CTA bands, body copy uses `text-slate-200` / `text-slate-300` rather than `text-red-50/100` to keep contrast above WCAG AA on the red surface.
2. The `text-blue-100` style previously used on dark slate heroes now resolves to `text-slate-200/300`, which passes AA on dark slate.

## 2026-07-08 — Vite + Astro 7 bundle-budget reinstall decision deferred

(NOT-A-CHANGE: scope size was small, scope creep risk too high; left to a future investigation.)

## 2026-07-11 — Triage sweep + StatRow extraction + dept card polish + issue close-out + opendesign audit

- **Triage**: Scanned all 20 open GitHub issues. Identified #17–#27 as already implemented and closable.
- **StatRow.astro**: Created reusable component. Replaced inline stat rows on 5 pages.
- **Department card differentiation**: left-border accent + distinct shades per card.
- **Closed issues #17–#27**: 11 closed with comments documenting completion status.
- **Opendesign audit**: Fixed 6 violations on `/languages/[slug]` hero stat block + `/programs/[category]/[slug]` modes table.
- **Build**: 66 pages, 8.07s, clean.

## 2026-07-11 — Full opendesign audit + course catalogue expansion (+18 pages)

- **Full opendesign audit**: 41 violations fixed across 28 page files + components.
- **Course catalogue expansion**: 9 new languages, 4 Professional, 3 Vocational.
- **Type system**: `Program.category` accepts `'Professional' | 'Vocational'`.
- **Dynamic routes**: Updated `/programs/[category]/index.astro` + `[slug].astro`.
- **Navbar**: Added 9 language links + Professional/Vocational entries.
- **Build**: 84 pages (up from 66), 3.37s, clean.

## 2026-07-11 — Navbar grid layout + second design sweep + GitHub tracking

- **Mega-menu restructure**: Languages 3-column grid; Programs grid layout.
- **Second design sweep**: 18 more violations fixed.
- **GitHub**: Issue #28 created.
- **Build**: 84 pages, 3.35s, clean.

## 2026-07-11 — Third design sweep: accessibility + motion + contrast

- **Accessibility-tester skill loaded**.
- **Motion**: `prefers-reduced-motion` global CSS rule; `motion-safe:` guards.
- **WCAG AA contrast fixes**.
- **GitHub**: Commented on #28.
- **Build**: 84 pages, 3.46s, clean.

## 2026-07-11 — Full TailGrids adoption + design finalization (sweep 4, final)

- **4 new Alert placements**: tuition-fees, contact, how-to-apply, online-education.
- **Copy voice sweep**: 13 factual corrections across 7 files.
- **buttonStyles import migration**: 23 files switched from `@/styles/button` → `@/components/tailgrids/core/button`.
- **Badge adoption**: 6 more pages gained `<Badge>`.
- **Stat grid standardized**.
- **Issue #28 closed**.
- **Build**: 84 pages, 3.74s, clean.

## 2026-07-11 — Triage sweep: all open issues triaged

- 7 closed as already-implemented (wontfix).
- 2 to `ready-for-human` (#11 level systems, #13 Frappe API).

## 2026-07-11 — Light + Dark theme implementation + visual regression tests

- **Dark mode CSS infrastructure**: `@custom-variant dark (&:where(.dark, .dark *))`.
- **CSS variable tokens for auto-switching**.
- **Dark mode toggle** in Header with localStorage.
- **Page-by-page dark mode adoption** across 84 pages.
- **Visual regression tests**: Playwright with 56 tests.
- **Bundle**: 194.6 KB JS, 75.2 KB CSS, all budgets pass.

## 2026-07-11 — 10 new TailGrids components installed

- Breadcrumbs on 17 pages, Table on 2 pages, List on 10 pages, Separator on 15 pages, Avatar on 3 pages, Link on 5 pages + 1, AspectRatio on blog, etc.
- **Accordion SSR fix**: Accordion + Avatar context hooks return safe defaults during Astro SSR.
- **Issues #15, #16 closed**.
- **Build**: 84 pages, 4.71s, clean. All bundle budgets pass.
