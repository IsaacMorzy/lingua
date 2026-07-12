# State

> Shared state for loop-engineering runs against `lingua`.

## Current focus

Course catalogue synced with ijlapsukunda.com: 19 languages, 14 tech, 7 business, 5 TVETA, 4 professional, 3 vocational programmes (33 programmes total). 84 static pages. Brand: Vodafone-red (`#E60000` light / `#ff3333` dark). Light + dark theme fully tokenised; Astro 7 + Tailwind v4 + TailGrids UI stack.

## Main tip

- `main` tip — `Merge pull request #35 from IsaacMorzy/chore/state-close-stale-ready-for-agent-queue` (`54054fa`), with feature commit `950b566 chore(state): close-out verified ready-for-agent queue (#31, #32, #34)`.
- PR: https://github.com/IsaacMorzy/lingua/pull/35 (MERGED 2026-07-13). Feature branch deleted via `--delete-branch`.
- 84-page build clean; vitest 8/8; `playwright test tests/visual/mobile-responsive.spec.ts --list` reports 21 tests across 4 viewports; bundle: ~194KB JS / ~75KB CSS.

## Active issues

- **None.** All six previously-listed issues are closed as of 2026-07-13 — merged PR for the close-out pass is the new `main` tip.
  - #11 (Level system viewer) — `ready-for-human`; blocked on Frappe backend restoration (cross-references #13).
  - #13 (Frappe REST API) — `ready-for-human`; blocked on a Frappe session-cookie auth strategy that survives the Astro build's statelessness.
  - #31, #32, #34 — closed by the close-out PR after end-to-end verification (see `loop-run-log.md` 2026-07-13 entry).
  - #33 (Frontend deployment automation) — operations half now self-serviceable via `docs/deployment/secrets.md`; closure awaits the four `DEPLOY_*` repo secrets being provisioned, after which the worker's PR can run with full secrets.
- Project 6 (IJLAPS Website): 0 items remain in the `ready-for-agent` column after this run. The next bucket of fresh engineering work is in the `Active work` section below.

## Gate updates applied 2026-07-12

- `loop-constraints.md`: Push / merge rules now allow agents to push feature branches and merge to `main` via `gh pr merge` when code-reviewer verdict is **safe to merge**. New Secret hygiene section: never store PATs in shell rc / tracked `.env`; tokens exposed in chat are compromised.
- `AGENTS.md`: destructive-action clause reframed — push + PR-merge carve-out explicitly allowed under code-reviewer verdict.

## Recent decisions

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

## Active work

- **Empty `ready-for-agent` queue** as of 2026-07-13. Open one of the following fresh tickets in the next run to refill it:
  - **ui-avatars → Frappe portraits** on `/instructors` (blocked on #11 backend).
  - **Unsplash → Frappe-attached img** on `/blog` (blocked on a `lingua_blog_post` DocType).
  - **`/admin` CMS section** backed by Frappe DocType (blocked on backend restoration that #11/#13 depend on).
  - **Provision `DEPLOY_*` secrets** via the repo Settings → Secrets UI flow described in `docs/deployment/secrets.md` (closes #33 from `ready-for-human` to `closed`).
  - **Housekeeping**: either `.gitignore` or delete the untracked `apps/lingua/yarn.lock`; document in a single-issue commit.
