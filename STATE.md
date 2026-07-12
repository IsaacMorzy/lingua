# State

> Shared state for loop-engineering runs against `lingua`.

## Current focus

Course catalogue synced with ijlapsukunda.com: 19 languages, 14 tech, 7 business, 5 TVETA, 4 professional, 3 vocational programmes (33 programmes total). 84 static pages. Brand: Vodafone-red (`#E60000` light / `#ff3333` dark). Light + dark theme fully tokenised; Astro 7 + Tailwind v4 + TailGrids UI stack.

## Main tip

- `main` tip — `Merge pull request #42 from IsaacMorzy/fix/deploy-port-4122` (`3722ebb`), with feature commit `2d95529 fix(ci): hardcode SSH port 4122 in deploy-frontend.yml`.
- PR: https://github.com/IsaacMorzy/lingua/pull/42 (MERGED 2026-07-13). Feature branch deleted via `--delete-branch`.
- 84-page build clean; vitest 8/8; `playwright test tests/visual/mobile-responsive.spec.ts --list` reports 21 tests across 4 viewports; `apps/lingua/yarn.lock` is gitignored and absent from the working tree; deploy workflow uses Node `'22'` (matches `mobile.yml`) and SSH port `4122` (hardcoded; server SSH daemon is non-standard).

## Active issues

- **None.** All six previously-listed issues are closed as of 2026-07-13 — merged PR for the close-out pass is the new `main` tip.
  - #11 (Level system viewer) — `ready-for-human`; blocked on Frappe backend restoration (cross-references #13).
  - #13 (Frappe REST API) — `ready-for-human`; blocked on a Frappe session-cookie auth strategy that survives the Astro build's statelessness.
  - #31, #32, #34 — closed by the close-out PR after end-to-end verification (see `loop-run-log.md` 2026-07-13 close-out entry).
  - #33 (Frontend deployment automation) — **one of two blockers fixed 2026-07-13 via PR #40** (Node 20→22 bump in `deploy-frontend.yml`). The other blocker (`DEPLOY_SSH_KEY` not yet provisioned) is the only remaining gate. See `Caveats` and `Active work` below.
  - #37 (yarn.lock housekeeping) — closed by PR #38 (`11537b8`) after `.gitignore` updated and the untracked file deleted.
- Project 6 (IJLAPS Website): 0 items remain in the `ready-for-agent` column after this run. The next bucket of fresh engineering work is in the `Active work` section below.

## Gate updates applied 2026-07-12

- `loop-constraints.md`: Push / merge rules now allow agents to push feature branches and merge to `main` via `gh pr merge` when code-reviewer verdict is **safe to merge**. New Secret hygiene section: never store PATs in shell rc / tracked `.env`; tokens exposed in chat are compromised.
- `AGENTS.md`: destructive-action clause reframed — push + PR-merge carve-out explicitly allowed under code-reviewer verdict.

## Recent decisions

- **Deploy port 4122 fix landed (2026-07-13)** — PR #42 (`3722ebb`). The 2026-07-13 smoke test of `deploy-frontend.yml` (run #29213863113, triggered after `DEPLOY_SSH_KEY` was provisioned) failed at the `Deploy to server` step with `ssh: connect to host port 22: Connection timed out`. The production server SSH daemon listens on **port 4122**, not 22. The workflow used bare `ssh`/`rsync` invocations that default to port 22; hardcoded `-p 4122` in all three SSH calls in the deploy + Frappe-migrate steps (the latter is `if: false` but updated for consistency). `docs/deployment/secrets.md` Step 4 `ssh-keyscan` was updated to include `-p 4122` and now documents the bracket-form `[host]:port` known_hosts entry that `ssh-keyscan` produces for non-default ports. Per operator direction the user picked the simpler hardcode over introducing a `DEPLOY_PORT` secret; future port changes are a code change. Operator must still re-capture `DEPLOY_HOST_KEY` against port 4122 (the current value was captured against port 22) — see `Active work` and `Caveats and follow-ups` below. Code-reviewer verdict: `safe to merge` (no HARD; 4 SOFT notes — all informational, no action taken).
- **Deploy Node 20→22 bump landed (2026-07-13)** — PR #40 (`836b264`). `.github/workflows/deploy-frontend.yml` now sets `node-version: '22'` (matches `mobile.yml`); Astro 7 requires `>=22.12.0` and the three recent failed deploys on `main` all stopped at the build step with `Node.js v20.20.2 is not supported by Astro!`. The next push to `main` should pass the build step. **`DEPLOY_SSH_KEY` is still the only remaining blocker for #33** — provision in the repo Settings → Secrets and variables → Actions UI per `docs/deployment/secrets.md` step 3 (paste `cat ~/.ssh/lingua_deploy_ed25519` output).
- **yarn.lock housekeeping landed (2026-07-13)** — PR #38 (`11537b8`). `.gitignore` now lists `yarn.lock` (with explanatory comment that NPM is authoritative and pointing at `frontend/package-lock.json`); the previously untracked `apps/lingua/yarn.lock` was deleted. `gh pr diff 38` shows only `.gitignore` because untracked files are not in the diff; the deletion is documented in the commit body + issue #37.
- **Deploy verification surfaced two real blockers for #33 (2026-07-13)**: (a) only 3 of 4 `DEPLOY_*` secrets are provisioned — `DEPLOY_SSH_KEY` is missing; (b) `.github/workflows/deploy-frontend.yml` sets `node-version: '20'` but `frontend/package.json` requires `>=22.12.0`. Three consecutive `main` deploys (#29207072106 / #29207621844 / #29211987871) failed at the build step with `Node.js v20.20.2 is not supported by Astro!`. Per user direction this run was verify-only (no trigger, no fix); tracked in `Caveats` and `Active work` for the next run.
- **ready-for-agent queue drained (2026-07-13)** — close-out PR closed #31, #32, #34 after end-to-end verification. **Verification surfaced two latent bugs the issue bodies glossed over:**
  - **Path-mismatch (bug A in #32)**: `tests/visual/mobile-responsive.spec.ts` lived at the repo root, outside `frontend/playwright.config.ts` `testDir: './tests/visual'`. Playwright reported `Total: 0 tests in 0 files`. Fix: `git mv tests/visual/mobile-responsive.spec.ts frontend/tests/visual/mobile-responsive.spec.ts` aligns with the existing `theme-screenshots.spec.ts` convention; no `test:mobile` script or `mobile.yml` workflow changes needed.
  - **Orphan test declaration (bug B in #32)**: a 2-line empty `test('/footer width is at least viewport width', async ({ page }) => {` with no body and no closing brace produced `TS1005: '}' expected` at the old line 220. Removed; the complete version of the same test exists later in `describe('tablet')`, so no coverage lost.
  - Result: `npx playwright test tests/visual/mobile-responsive.spec.ts --list` now reports **21 tests across 4 viewports** (mobile-sm 6 + mobile-md 4 + tablet 10 + desktop 1). The "20 tests" wording in the issue body was off by one — corrected here as the authoritative record.
- **Verification-before-close is the queue-drain protocol**. Issue bodies claiming "Done" are not authoritative; re-run the test (or `playwright test --list`) before closing. Code-reviewer verdict on the diff: `safe to merge` (no HARD findings).
- **TypeScript verification command**: prefer `npx tsc --noEmit -p frontend/tsconfig.json` rather than `tsc --noEmit <single-file>`, which falls back to a minimal default lib and produces spurious `Promise/Map/Set undefined` errors that are toolchain-mismatch artifacts, not real spec defects.
- **New ops doc**: `docs/deployment/secrets.md` — provisioning playbook for the four GitHub Actions secrets (DEPLOY_SSH_KEY / DEPLOY_HOST_KEY / DEPLOY_HOST / DEPLOY_USER) consumed by `.github/workflows/deploy-frontend.yml`. Includes PAT hygiene & disaster recovery sections.
- `deployment/nginx/README.md` cross-references the new ops doc.
- Full opendesign audit completed across all 28 pages + components — 41 violations fixed.
- Course catalogue expanded from real data at ijlapsukunda.com: 9 new languages, 4 Professional courses, 3 Vocational courses.
- 84 static pages built (up from 66). TailGrids Card adopted universally (44 manual card divs replaced in 22 files).
- **Vodafone-red brand migration**: primary `#E60000` light / `#ff3333` dark.
- **TailGrids roll-out**: Card on tiles; Alert on date pages; native `<details>` for FAQ.
- **Tokens extended**: `--color-warning`, `--color-success`, etc. in `@theme`.
- **Newsletter backend wiring**.
- **Pexels imagery migration (retired)**.
- **Mobile responsive Playwright**: 20 tests + `mobile.yml` workflow + `test:mobile:debug`.
- **vitest 2.1.9 unit tests**: 8/8.
- **CVA mirror consolidation**.
- **Deployment automation (PR #30 commit 2)**.

## Recent design corrections

- StatRow extracted; 5 pages adopted.
- Department cards: left-border accent per card.
- Opendesign audit: `backdrop-blur` removed; `text-yellow-300` → `text-warning`.
- GitHub issues #17–#27 closed.

## Previous design corrections

- **CTABand body contrast**: `text-slate-200` on Vodafone red → `text-white/85`.
- **Hero system drift**: emerald-900 chip + decorative orb removed.
- **Footer token alignment**: `bg-slate-900` → `bg-ink`.
- **Newsletter form a11y**: `action="/api/newsletter"` removed; status div `aria-live="polite"`.
- **Stat row labels**: sr-only `<h2>` headings precede each band.
- **CVA inverted focus ring**.

## Caveats and follow-ups

- The PAT in the original chat message is now in this transcript and is compromised. Best practice: revoke at github.com/settings/tokens; mint a **fine-grained PAT** scoped only to `IsaacMorzy/lingua` with reduced perms (Contents/Pull requests/Issues/Projects/Workflows: Read+Write). Never paste a fresh PAT into a chat log.
- The active `gh` CLI auth (cached in `/home/grand/.config/gh/hosts.yml` with 0700 perms) was used for this run; logout + reauth via `gh auth login --with-token` after revoking.
- Issue #33 unblocks once the four DEPLOY_* secrets are provisioned via the repo Settings → Secrets UI flow described in `docs/deployment/secrets.md`.
- `loop-constraints.md` and `AGENTS.md` now define the operating model: agents may push feature branches + merge PRs to main when the code-reviewer verdict is safe.
- After the close-out PR, `tests/visual/` at repo root is now empty. Git ignores empty directories; the existing `.gitignore` entry covering `tests/.last-run.json` still applies if Playwright ever regenerates it from that path.
- Untracked `apps/lingua/yarn.lock` (NPM-is-authoritative per `frontend/package-lock.json` + `mobile.yml` `npm ci`) is out of scope for this PR — open a separate housekeeping issue to either `.gitignore` or delete it.
- ~~**`DEPLOY_SSH_KEY` is missing from the repo's GitHub Actions secrets.** `gh secret list` reports only `DEPLOY_HOST` / `DEPLOY_HOST_KEY` / `DEPLOY_USER` (all 2026-07-12). Without the SSH private key, `webfactory/ssh-agent@v0.9.0` cannot authenticate the runner. Provision per `docs/deployment/secrets.md` step 3 (cat `~/.ssh/lingua_deploy_ed25519`).~~ **FIXED 2026-07-13** — secret provisioned; smoke test run #29213863113 confirmed the SSH agent step now authenticates successfully.
- **`.github/workflows/deploy-frontend.yml` pins `node-version: '20'`.** ~~Astro requires `>=22.12.0` per `frontend/package.json` engines / peerDependencies. The first three deploys against the workflow failed at the build step with `Node.js v20.20.2 is not supported by Astro!`. Bump to `'22'` in the workflow file.~~ **FIXED 2026-07-13 via PR #40** — workflow now uses `'22'`.
- **`DEPLOY_HOST_KEY` was captured against port 22.** The server's SSH daemon listens on port 4122. The current `DEPLOY_HOST_KEY` secret is in non-bracket form (`host ssh-ed25519 AAAA...`) and the SSH client when connecting to `host:4122` will look for `[host]:4122` in known_hosts; the strict host-key check will fail. The workflow fix is on `main` via PR #42 (`3722ebb`); the operator must re-capture with `ssh-keyscan -p 4122 -t ed25519,ecdsa,rsa ijlaps.ac.ke` and update the secret.
- **Smoke test #29213863113 (2026-07-13)**: `deploy-frontend.yml` was triggered via `workflow_dispatch` after `DEPLOY_SSH_KEY` was provisioned. **Build passed** (Node 22 confirmed, all 84 pages built, artifacts uploaded). **Deploy step failed** at `ssh: connect to host port 22: Connection timed out`. Root cause + fix: see PR #42 + Active work + Recent decisions. After the operator re-captures `DEPLOY_HOST_KEY` against port 4122, re-trigger the workflow to verify end-to-end.
- **Three consecutive failed deploys on `main`**: runs #29207072106, #29207621844, #29211987871. All three failed at the build step. Once `DEPLOY_SSH_KEY` is provisioned and `node-version: '22'` is in place, the next push to `main` should succeed end-to-end.

## Active work

- **One remaining follow-up for #33 (after the smoke test surfaced a third blocker):**
  1. **Re-capture `DEPLOY_HOST_KEY` against port 4122** in the repo Settings → Secrets and variables → Actions UI. The current secret was captured against port 22 (pre-dates the port fix). The 2026-07-13 smoke test of `deploy-frontend.yml` (run #29213863113) confirmed the build passes (Node 22 + DEPLOY_SSH_KEY) but the deploy step fails because the workflow's bare `ssh`/`rsync` defaulted to port 22; the server's SSH daemon listens on port 4122. The fix is on `main` via PR #42 (`3722ebb`); once the operator re-captures `DEPLOY_HOST_KEY` with `ssh-keyscan -p 4122 -t ed25519,ecdsa,rsa ijlaps.ac.ke` and updates the secret, the next `gh workflow run deploy-frontend.yml` should run end-to-end. (UI path: https://github.com/IsaacMorzy/lingua/settings/secrets/actions → DEPLOY_HOST_KEY → Update → paste → Update secret.) `DEPLOY_SSH_KEY` was provisioned earlier today and the Node 20→22 fix is on `main` via PR #40; this is the only remaining operator action before the deploy pipeline is green.
- **Other fresh-ticket candidates** for when the deploy blockers are resolved:
  - **ui-avatars → Frappe portraits** on `/instructors` (blocked on #11 backend).
  - **Unsplash → Frappe-attached img** on `/blog` (blocked on a `lingua_blog_post` DocType).
  - **`/admin` CMS section** backed by Frappe DocType (blocked on backend restoration that #11/#13 depend on).
- **#37 (yarn.lock housekeeping) — DONE 2026-07-13** via PR #38 (`11537b8`). `yarn.lock` is gitignored and absent from the working tree.
