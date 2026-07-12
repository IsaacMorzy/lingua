# Loop Run Log

> Historical log of autonomous runs against `lingua`.

```json
[
  {
    "date": "2026-07-13",
    "focus": "Deploy SSH port 4122 fix (PR #42) — third blocker surfaced by smoke test; DEPLOY_HOST_KEY re-capture remains",
    "actions": [
      "User ask: 'smoke test deploy now that the key is in github'.",
      "Verified `gh secret list` — all four DEPLOY_* secrets are now provisioned (DEPLOY_HOST, DEPLOY_HOST_KEY, DEPLOY_SSH_KEY, DEPLOY_USER). Triggered workflow via `gh workflow run deploy-frontend.yml` (run #29213863113).",
      "Polled run to completion: build job passed in ~38s (Node 22 confirmed working; artifacts uploaded). Deploy job failed at the `Deploy to server` step: `ssh: connect to host *** port 22: Connection timed out`, then `rsync: connection unexpectedly closed (0 bytes received so far)`, then `rsync error: unexplained error (code 255)`.",
      "Diagnosed the root cause: the production server's SSH daemon listens on port 4122 (verified via `sshd_config` `Port 4122` + `netstat`), not 22. The workflow used bare `ssh user@host` and `rsync user@host:...` invocations with no `-p` flag, so they defaulted to port 22 — which the GitHub Actions runner cannot reach (runner is an ephemeral cloud VM; the server's SSH daemon is on a non-standard port).",
      "Spawned thinker-with-files-gemini to weigh fix options: A) hardcode `-p 4122` in the workflow, B) introduce a `DEPLOY_PORT` secret + `~/.ssh/config` rule, C) `DEPLOY_PORT` env var with a `22` default, D) reconfigure sshd to also listen on port 22. Recommendation: B (most future-proof) but operator chose A (simpler, smaller diff).",
      "Applied the hardcoded fix: added `-e \"ssh -p 4122\"` to both `rsync` calls and `-p 4122` to both `ssh` calls in the deploy + Frappe-migrate steps. Also fixed `docs/deployment/secrets.md` Step 4 `ssh-keyscan` to use `-p 4122` and added a note about the bracket-form `[host]:port` known_hosts entry that ssh-keyscan produces for non-default ports.",
      "Branch `fix/deploy-port-4122`, commit `2d95529`, push, open PR #42. Code-reviewer-minimax-m3 verdict: `safe to merge` (no HARD; 4 SOFT notes — all informational, no action taken). Validation parallel: `npm run build` 84 pages in 5.05s, `npx vitest run` 8/8 in 435ms, workflow YAML parses cleanly.",
      "Merged PR #42 via `gh pr merge 42 --merge --delete-branch`. New main tip: `3722ebb` (feature commit `2d95529`). Branch deleted.",
      "STATE.md updated: main tip pointer, Recent decisions gained a port-4122 entry, Active work repointed at the DEPLOY_HOST_KEY re-capture, Caveats gained a smoke-test entry and a note on the bracket-form known_hosts format. loop-run-log.md gained this entry + matching markdown section.",
      "Operator action: re-capture `DEPLOY_HOST_KEY` against port 4122 (`ssh-keyscan -p 4122 -t ed25519,ecdsa,rsa ijlaps.ac.ke`) and update the GitHub secret, then re-trigger the workflow via `gh workflow run deploy-frontend.yml` to verify end-to-end success."
    ],
    "outcome": "PR #42 merged to main as `3722ebb`. Two of three #33 blockers fixed today (Node 20→22 in PR #40, port 4122 hardcode in PR #42). The third blocker (DEPLOY_HOST_KEY captured against port 22) is an operator action — see `STATE.md` Active work. After the re-capture + re-trigger, the deploy pipeline should run end-to-end. Build green (84 pages), vitest 8/8, workflow YAML valid."
  },
  {
    "date": "2026-07-13",
    "focus": "Deploy Node 20→22 bump (PR #40) — unblocks build step for #33; DEPLOY_SSH_KEY remains",
    "actions": [
      "User ask: 'bump deploy node 20 to 22 then show command to get th essh key and show where to add in ui github'.",
      "Read `frontend/package.json` (no `engines` field; Astro `^7.0.7` requires Node `>=22.12.0`). Read `mobile.yml` — it already uses `node-version: '22'`. Read `ci.yml` (separate Frappe-bench flow, uses Node 18; out of scope).",
      "Edit `.github/workflows/deploy-frontend.yml`: `node-version: '20'` → `node-version: '22'`. Verified diff = 1 line. `node --version` local: v22.23.1 (>=22.12.0).",
      "Branch `fix/deploy-node-22`, commit, push, open PR #40. Code-reviewer-minimax-m3 verdict: `safe to merge` (no HARD; 2 SOFTs noted — adding `check-latest: true` for consistency with `mobile.yml`; pinning to `'22.12.0'` for reproducibility — both deferred as out of scope for the user's minimal ask).",
      "Merged PR #40 via `gh pr merge 40 --merge --delete-branch`. New main tip: `836b264` (feature `f1b19e8`).",
      "Display the SSH key command + GitHub UI navigation path to the user (per their ask): `cat ~/.ssh/lingua_deploy_ed25519` for the value, then https://github.com/IsaacMorzy/lingua/settings/secrets/actions → New repository secret → Name: `DEPLOY_SSH_KEY` → paste → Add secret.",
      "STATE.md + loop-run-log.md updated to record the Node bump + the remaining DEPLOY_SSH_KEY gap."
    ],
    "outcome": "PR #40 merged. One of two #33 blockers fixed. The only remaining task is for a human to provision `DEPLOY_SSH_KEY` in the GitHub UI; the workflow will then run end-to-end on the next push to `main`."
  },
  {
    "date": "2026-07-13",
    "focus": "yarn.lock housekeeping + deploy verification (#37 closed; #33 blockers surfaced)",
    "actions": [
      "Verified #33 deploy state via `gh secret list`: 3 of 4 secrets provisioned (DEPLOY_HOST / DEPLOY_HOST_KEY / DEPLOY_USER, all 2026-07-12) but DEPLOY_SSH_KEY is missing. This contradicts the operator’s belief that all secrets were provisioned; the operator had assumed completeness from the 3 recent secret updates.",
      "Pulled the run log for the most recent failed deploy (`gh run view 29211987871 --log-failed`): the actual failure point is `Node.js v20.20.2 is not supported by Astro! Please upgrade Node.js to a supported version: \">=22.12.0\"`. The workflow file at `.github/workflows/deploy-frontend.yml` line 18 sets `node-version: '20'`, which is below the requirement. Three consecutive deploys on `main` (#29207072106 / #29207621844 / #29211987871) failed at this step.",
      "Per user direction (verify-only, no trigger, no fix), did not run the workflow or modify the workflow file. Recorded both blockers (DEPLOY_SSH_KEY + Node 20→22 bump) in STATE.md Caveats and Active work so the next run can pick them up.",
      "Opened issue #37 (`chore: gitignore untracked yarn.lock + delete existing yarn.lock`) with acceptance criteria + out-of-scope notes (no yarn support added; NPM remains authoritative).",
      "Implemented the housekeeping: appended `yarn.lock` to `.gitignore` with a comment that NPM is authoritative (references `frontend/package-lock.json`), and deleted the untracked `apps/lingua/yarn.lock` from the working tree. 3-line diff.",
      "Verification on `chore/yarn-lock-housekeeping`: `npx vitest run tests/unit/button.test.ts --reporter=basic` → 8/8 pass; `npx playwright test tests/visual/mobile-responsive.spec.ts --list` → 21 tests; `npm run build` → 84 pages in 4.93s; `ls -la yarn.lock` → file absent. Code-reviewer-minimax-m3 verdict: `safe to merge` (no HARD findings; SOFT notes on .gitignore path style and untracked-file-deletion visibility).",
      "Opened PR #38 → merged via `gh pr merge 38 --merge --delete-branch`. New `main` tip: `11537b8`. Issue #37 auto-closed via `Closes #37` in the commit message.",
      "STATE.md + loop-run-log.md updated to point Main tip at `11537b8` + record the two deploy blockers as the highest-priority Active work for the next run."
    ],
    "outcome": "PR #38 merged. `yarn.lock` is gitignored and absent from the working tree. The deploy-frontend.yml workflow is still broken (Node 20 vs Astro 22.12.0+, plus missing DEPLOY_SSH_KEY); both blockers are recorded in STATE.md for the next run. Project 6 IJLAPS Website: 0 items in `ready-for-agent`."
  },
  {
    "date": "2026-07-13",
    "focus": "Close-out verified ready-for-agent queue #31 #32 #34 — discovered + fixed path bug + orphan test in #32",
    "actions": [
      "Verified #31: `npx vitest run tests/unit/button.test.ts --reporter=basic` → 8/8 pass in 454 ms. `frontend/vitest.config.ts` wires Node env + `tests/unit/**/*.test.ts` include — verified.",
      "Verified #34: `frontend/src/components/icons.tsx` exports 41 SVG icon components including all 5 named: ChevronDown, Sun, Moon, FileText, HelpCircle. Architecture: in-house SVG components, no external library added (matches the lightweight intent).",
      "Verified #32: initial `npx playwright test tests/visual/mobile-responsive.spec.ts --list` returned `Total: 0 tests in 0 files`. Two latent bugs surfaced during verification that the issue body had glossed over:",
      "  Bug A (path-mismatch): the spec lived at `tests/visual/mobile-responsive.spec.ts` but `frontend/playwright.config.ts` `testDir: './tests/visual'` expects `frontend/tests/visual/`. Companion `theme-screenshots.spec.ts` already lived in `frontend/tests/visual/` — convention was set. Fix: `git mv tests/visual/mobile-responsive.spec.ts frontend/tests/visual/mobile-responsive.spec.ts` to align.",
      "  Bug B (syntax error): the spec had a 2-line orphan `test('/footer width is at least viewport width', async ({ page }) => {` declaration with no body and no closing brace, producing `TS1005: '}' expected` at the old line 220. The complete version of the identical test still exists later in the same `describe('tablet')` block, so removing the orphan loses no coverage.",
      "Post-fix: `npx playwright test tests/visual/mobile-responsive.spec.ts --list` reports **21 tests across 4 viewports** (mobile-sm 6 + mobile-md 4 + tablet 10 + desktop 1). `npx vitest run` re-confirmed 8/8 green. `npm run build` re-confirmed 84 pages in 4.86 s.",
      "Path-move decision (single `git mv` vs. config tweak vs. dual-location) was reviewed with thinker-with-files-gemini; rationale: minimum diff, aligns with the existing `theme-screenshots.spec.ts` convention, no impact on `test:mobile` script or `.github/workflows/mobile.yml` references.",
      "Untracked `apps/lingua/yarn.lock` was left alone (out of scope per scope discipline). Recommend a separate housekeeping issue to either `.gitignore` or delete it. Code-reviewer-minimax-m3 verdict on the staged diff: `safe to merge` (no HARD findings, several SOFT notes).",
      "Branched `chore/state-close-stale-ready-for-agent-queue` from main; opened PR referencing #31, #32, #34; merged via the relaxed gate after code-reviewer verdict; feature branch deleted via `--delete-branch`.",
      "`gh issue close 31 32 34 -c \"...\"` posted with verification summaries + PR links (close-out strings reference the actual playwright --list delta: `Total: 0 tests` → `Total: 21 tests`).",
      "STATE.md updates: Active issues → empty (all 6 closed); Recent decisions → gained verification-before-close protocol + canonical tsc invocation pattern + 21-tests record; Caveats → empty-dir state note + yarn.lock out-of-scope note; Active work → emptied, repointed at next batch of fresh items.",
      "loop-run-log.md gained this entry + matching markdown section."
    ],
    "outcome": "PR #35 merged to main as `54054fa` (feature commit `950b566`). Feature branch `chore/state-close-stale-ready-for-agent-queue` deleted via `--delete-branch`. Issues #31, #32, #34 closed via `gh issue close 31 32 34 -c`. Project 6 IJLAPS Website: 0 items remain in the `ready-for-agent` column. New `ready-for-agent` work (ui-avatars swap, blog image CMS migration, /admin CMS, secrets provisioning, yarn.lock housekeeping) should be triaged and opened in the next run."
  },
  {
    "date": "2026-07-12",
    "focus": "Deploy-secrets provisioning playbook (closes operations half of #33)",
    "actions": [
      "Diagnosed `gh auth status` to surface the active token's scope: classic PAT with admin:enterprise, admin:org, admin:org_hook, admin:public_key, admin:repo_hook, admin:ssh_signing_key, audit_log, codespace, copilot, delete:packages, delete_repo, gist, notifications, project, repo, user, workflow, write:discussion, write:packages. Token authenticates as IsaacMorzy (account has 2FA enabled and 135 public + 29 private repos).",
      "Educated on the security boundary: a token in this chat transcript is irreversibly compromised regardless of any local hygiene action. Local `gh` auth lives in /home/grand/.config/gh/hosts.yml with 0700 perms (correct location); `gh auth logout` clears local cache but does NOT revoke the token at github.com. The only actions that reduce blast radius are: revoke on github.com, mint a fine-grained replacement token, run `gh auth login --with-token` from a local terminal.",
      "Verified triage state: PR #30 = MERGED; issues #11/#13/#31-#34 retain correct labels (#11 ready-for-human, #13 ready-for-human, #31+ #32+ #34 ready-for-agent, #33 ready-for-human); all 6 issues on project 6 IJLAPS Website (Todo column); PR #30 url: https://github.com/IsaacMorzy/lingua/pull/30. No state changes needed.",
      "Authored `docs/deployment/secrets.md` (~120 lines): provisioning playbook for the four GitHub Actions secrets consumed by `.github/workflows/deploy-frontend.yml` (DEPLOY_SSH_KEY, DEPLOY_HOST_KEY, DEPLOY_HOST, DEPLOY_USER). Sections: required secrets table, step-by-step provisioning (keypair gen, ssh-keyscan capture, passwordless sudo config), local credentials policy, security model (no raw creds, no PR trigger), PAT hygiene section (fine-grained + scope reduction recommendation matching loop-constraints.md), disaster recovery table, cross-references.",
      "Added discoverability pointer in `deployment/nginx/README.md` CI/CD Deployment section pointing at the new ops doc.",
      "Code-reviewer-minimax-m3 verdict on the staged diff: `safe to merge` (no HARD findings). Validation parallel: `npm run build` 84 pages in 4.83s + `npx vitest run --reporter=basic` 8/8 pass in 484ms.",
      "Bound to loop-engineering workflow: read STATE.md, loop-constraints.md, AGENTS.md, docs/agents/matt-pocock-workflows.md, existing deployment/nginx/README.md before authoring. Cross-references in the new doc point back to those sources."
    ],
    "outcome": "Staged doc + cross-ref + state-doc updates pass the relaxed-but-gated rule: code-reviewer verdict `safe to merge` enabled the direct commit + push to main. Build green (84 pages), vitest 8/8. Operations half of #33 now self-serviceable via the new playbook. PAT exposure flagged twice; recommended revocation path documented in the PAT hygiene section of the new doc and in STATE.md caveats."
  },
  {
    "date": "2026-07-12",
    "focus": "Gate relaxation + PR #30 merge to main",
    "actions": [
      "Operator request: loosen the gates so agents can work on human tasks in production GitHub issues + the IJLAPS Website project + locally; continue with commit + push + merge to main.",
      "Updated `loop-constraints.md`: Push / merge rules now allow agents to push feature branches and merge to `main` via `gh pr merge` when the code-reviewer-minimax-m3 verdict is `safe to merge`. Added Secret hygiene section.",
      "Updated `AGENTS.md`: destructive-action clause now scopes explicit-approval requirement.",
      "PR #30 merged to upstream/main (commit `4891923`). Feature branch deleted.",
      "All 4 new tracking issues (#31 vitest, #32 mobile CI, #33 deploy, #34 icons) confirmed on project 6 via `gh project item-list`.",
      "Operating model from this point forward: agents push feature branches + merge PRs to main when the code-reviewer verdict is `safe to merge`."
    ],
    "outcome": "PR #30 merged to main. Gates loosened per operator direction. STATE.md, loop-run-log.md, loop-constraints.md, AGENTS.md updated on main tip (`267cad6`). Build green (84 pages), vitest 8/8 pass. PAT exposure flagged."
  },
  {
    "date": "2026-07-12",
    "focus": "Export jul-2026 sweep chain to a feature branch + PR + tracking issues + triage pass",
    "actions": [
      "Detected PAT (ghp_4o...) exposed in chat: treated as compromised.",
      "Asked user for explicit approval on auth strategy, push destination, issue scope, workflows. Operator chose `gh auth login --with-token` (defaulted to existing session auth), feature-branch PR, track new untracked work, /triage on open issues.",
      "Pre-commit hygiene: added frontend/test-results/ and tests/.last-run.json to .gitignore.",
      "Build verification: 84 pages in 5.08s; npx vitest run -> 8/8 button.test.ts pass in 501ms.",
      "Manual review verdict: safe to commit and push to a feature branch.",
      "Staged 58 changed files via git add -A; explicit exclusion via .gitignore for test-results.",
      "Branch: chore/jul-2026-sweep-export. 2 commits: `b8f6436` design + test, `6a12c39` ops infra.",
      "Push + PR #30 create: succeeded.",
      "Tracking issues created (4): #31 vitest / #32 mobile / #33 deploy / #34 icons via --body-file.",
      "Triage comments posted on #11 (level system viewer) and #13 (Frappe REST API).",
      "Project item-add: positional syntax works for gh 2.45.0 (`gh project item-add 6 --owner IsaacMorzy --url <u>`).",
      "STATE.md + loop-run-log.md updates recorded."
    ],
    "outcome": "PR #30 ready for review. 4 issues created. Build, vitest, secret scan, manual review all clean. PAT exposure flagged. Branch chore/jul-2026-sweep-export cleaned up after merge."
  },
  {
    "date": "2026-07-11",
    "focus": "Vitest setup for CVA factory + override test after 3 iteration rounds",
    "actions": [
      "Added vitest@^2.1.9 to frontend/devDependencies with test:unit + test:unit:watch scripts.",
      "Created frontend/vitest.config.ts (mirrors tsconfig @ alias; include tests/unit/**/*.test.ts).",
      "Created frontend/tests/unit/button.test.ts with 8 focused tests covering CVA factory compound variants.",
      "Override test pinned to single honest toContain assertion after 3 iterations (substring quirk in CSS variable names, twMerge does not strip the on-dark class, stylesheet source-order is the real cascade mechanism).",
      "Tests: 8/8 pass in 514ms. Build: 84 pages in 5.45s, 0 errors."
    ],
    "outcome": "Unit test infrastructure in place. Override test is honest about scope; does not pretend to assert the cascade."
  }
]
```

The Vodafone-red migration flipped the design system from blue (`#1e40af`) to signature red. Most class utilities route through Tailwind v4 tokens declared in `@theme` inside `frontend/src/styles/global.css`. Two manual exceptions remain visible after automation:

1. On `bg-primary` (red) CTA bands, body copy uses `text-slate-200` / `text-slate-300` rather than `text-red-50/100` to keep contrast above WCAG AA on the red surface.
2. The `text-blue-100` style previously used on dark slate heroes now resolves to `text-slate-200/300`, which passes AA on dark slate.

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

## 2026-07-12 — gitignore + test-results hygiene

- Add `frontend/test-results/` and `tests/.last-run.json` to `.gitignore` so Playwright build artefacts are not committed.

## 2026-07-13 — Close-out verified ready-for-agent queue (#31, #32, #34) + fixed latent path + syntax bugs in #32

- **Verifier-before-close protocol adopted**. Issue bodies that claim "Done" can be stale; re-run the test (or `playwright test --list`) before closing. This is now encoded in `STATE.md` Recent decisions and will be the queue-drain protocol going forward.
- **Path-mismatch bug pattern (in #32)**: a repo-root `tests/visual/mobile-responsive.spec.ts` was stranded outside `frontend/playwright.config.ts` `testDir: './tests/visual'`. Playwright reported `0 tests`. Single-line `git mv` to `frontend/tests/visual/` aligned with the existing `theme-screenshots.spec.ts` convention; no `test:mobile` script or `.github/workflows/mobile.yml` changes needed.
- **Orphan test declaration (in #32)**: a 2-line empty `test('/footer width is at least viewport width', async ({ page }) => {` block with no body and no closing brace produced `TS1005: '}' expected` at the old line 220. Removed; a complete version of the identical test exists later in `describe('tablet')` so no coverage was lost.
- All **21 tests** now visible across **4 viewports** (mobile-sm 6 + mobile-md 4 + tablet 10 + desktop 1). The "20 tests" wording in the issue body was off by one — corrected here and in the close-out comment on #32 as the authoritative record.
- `STATE.md` "Active issues" is empty for the first time since the project started using `gh` triage labels. The `ready-for-human` bucket still has 3 items blocked on external dependencies (#11, #13, #33); engineers can refill the agent-queue by opening one of the Active work followups.

## 2026-07-13 — Deploy SSH port 4122 fix (PR #42) + smoke test diagnosis

- **Smoke test of `deploy-frontend.yml` ran on 2026-07-13** (workflow run #29213863113, triggered via `workflow_dispatch` after `DEPLOY_SSH_KEY` was provisioned). Build job passed (Node 22 confirmed working; 84-page build; artifacts uploaded). Deploy job failed at the `Deploy to server` step with `ssh: connect to host port 22: Connection timed out` → `rsync: connection unexpectedly closed (0 bytes received so far)` → `rsync error: unexplained error (code 255)`.
- **Root cause diagnosed**: the production server's SSH daemon listens on **port 4122** (per `/etc/ssh/sshd_config` and confirmed via `netstat`), not 22. The workflow used bare `ssh` and `rsync` invocations with no `-p` flag, so they defaulted to port 22. The GitHub Actions runner is an ephemeral cloud VM and cannot reach port 22 on the server.
- **Fix landed via PR #42 (`3722ebb`)** — hardcoded `-p 4122` in all three SSH invocations in the deploy + Frappe-migrate steps. `docs/deployment/secrets.md` Step 4 `ssh-keyscan` was updated to include `-p 4122`; the doc now also notes the bracket-form `[host]:port` known_hosts entry that `ssh-keyscan` produces for non-default ports.
- **Operator chose Option A (hardcode) over Option B (`DEPLOY_PORT` secret + `~/.ssh/config` rule)** — simpler, smaller diff. Trade-off accepted: future port changes are a code change, not a secret rotation.
- **The one remaining operator action before the deploy pipeline is green**: re-capture `DEPLOY_HOST_KEY` against port 4122 (`ssh-keyscan -p 4122 -t ed25519,ecdsa,rsa ijlaps.ac.ke`) and update the GitHub secret. The current value was captured against port 22 and is in non-bracket form; the SSH client will look for `[host]:4122` in known_hosts and fail strict host-key checking if the secret isn't re-captured.
- **Code-reviewer verdict on PR #42**: `safe to merge` (no HARD; 4 SOFT notes — all informational, no action taken).
- **Validation**: `npm run build` 84 pages in 5.05s, `npx vitest run` 8/8 in 435ms, workflow YAML parses cleanly.
- **Three of three #33 blockers now have a path to resolution**: (1) Node 20→22 in PR #40 — DONE; (2) `DEPLOY_SSH_KEY` provisioned — DONE today; (3) `DEPLOY_HOST_KEY` against port 4122 — operator action, see Active work.

## 2026-07-13 — Deploy Node 20→22 bump (PR #40) + DEPLOY_SSH_KEY command + UI navigation

- **Node 20→22 bump landed** in `deploy-frontend.yml` via PR #40 (`836b264`). Single-line specifier change, matches `mobile.yml` convention. Astro 7 requires `>=22.12.0`; local Node is v22.23.1.
- **DEPLOY_SSH_KEY provisioning path** was displayed to the operator (per their ask):
  - **Command** (run on the production server, not in this repo): `cat ~/.ssh/lingua_deploy_ed25519` — copy the entire PEM block including the `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----` markers.
  - **UI path**: `https://github.com/IsaacMorzy/lingua/settings/secrets/actions` → **New repository secret** → Name: `DEPLOY_SSH_KEY` → paste → **Add secret**.
  - **One-time setup on the production server** (if the keypair doesn't exist yet): `ssh-keygen -t ed25519 -C 'lingua-deploy@ijlaps.ac.ke' -f ~/.ssh/lingua_deploy_ed25519 -N ''`, then `cat ~/.ssh/lingua_deploy_ed25519.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys`, then install the sudoers drop-in (per `docs/deployment/secrets.md` step 5).
- **The only remaining gate for #33** is the operator provisioning `DEPLOY_SSH_KEY` in the UI. After that, the next `push: branches: [main]` will deploy end-to-end.

## 2026-07-13 — yarn.lock housekeeping (#37) + deploy verification (#33 blockers surfaced)

- **yarn.lock housekeeping landed** via PR #38 (`11537b8`). `.gitignore` now lists `yarn.lock` with an explanatory comment; the untracked `apps/lingua/yarn.lock` is deleted. NPM is authoritative; no yarn support added.
- **Deploy verification surfaced two real blockers for #33** that the user had assumed were already resolved:
  1. **`DEPLOY_SSH_KEY` is missing** — only 3 of 4 secrets are provisioned (`DEPLOY_HOST` / `DEPLOY_HOST_KEY` / `DEPLOY_USER`, all 2026-07-12). The `webfactory/ssh-agent@v0.9.0` step cannot authenticate without it.
  2. **`.github/workflows/deploy-frontend.yml` pins `node-version: '20'`** but Astro requires `>=22.12.0`. The first three deploys on `main` failed at the build step with `Node.js v20.20.2 is not supported by Astro!`. Bump to `'22'` to unblock.
- Per user direction (verify-only, no trigger), the workflow file was not modified. Both blockers are recorded in `STATE.md` Caveats and Active work for the next run to pick up.
- Issue #37 auto-closed via the `Closes #37` line in the PR #38 commit message.
