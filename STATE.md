# State

> Shared state for loop-engineering runs against `lingua`.

## Current focus

Course catalogue synced with ijlapsukunda.com: 19 languages, 14 tech, 7 business, 5 TVETA, 4 professional, 3 vocational programmes (33 programmes total). 84 static pages. Brand: Vodafone-red (`#E60000` light / `#ff3333` dark). Light + dark theme fully tokenised; Astro 7 + Tailwind v4 + TailGrids UI stack.

## Main tip

- `main` tip — `chore(rules): loosen push/merge gates for autonomous PR flow` (`267cad6`), on top of PR #30 merge commit (`4891923`).
- PR: https://github.com/IsaacMorzy/lingua/pull/30 (MERGED 2026-07-12).
- 84-page build clean; vitest 8/8; bundle: ~194KB JS / ~75KB CSS.

## Active issues

- #11: Level system viewer — `ready-for-human` (still blocked on Frappe backend)
- #13: Frappe REST API — `ready-for-human` (still blocked on CSRF + auth)
- #31: vitest 2.1.9 setup + CVA factory unit tests — `ready-for-agent`
- #32: Mobile responsive Playwright spec + CI workflow — `ready-for-agent`
- #33: Frontend deployment automation — `ready-for-human` (waiting on DEPLOY_* secrets)
- #34: Icon library extension — `ready-for-agent`
- All on project 6 (IJLAPS Website) — verified via `gh project item-list`.

## Gate updates applied 2026-07-12

- `loop-constraints.md`: Push / merge rules now allow agents to push feature branches and merge to `main` via `gh pr merge` when code-reviewer verdict is **safe to merge**. New Secret hygiene section: never store PATs in shell rc / tracked `.env`; tokens exposed in chat are compromised.
- `AGENTS.md`: destructive-action clause reframed — push + PR-merge carve-out explicitly allowed under code-reviewer verdict.

## Recent decisions

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

## Active work

- Swap ui-avatars instructor placeholders on `/instructors` for real portraits sourced from Frappe `lingua_instructor` DocType.
- Replace Unsplash placeholders on `/blog` with cms-managed imagery.
- Author /admin CMS section backed by Frappe DocType (waiting on Frappe backend restoration that #11 and #13 depend on).
- Provision `DEPLOY_*` secrets to enable deploy-frontend.yml (see `docs/deployment/secrets.md`).
