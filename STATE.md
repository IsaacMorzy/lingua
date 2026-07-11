# State

> Shared state for loop-engineering runs against `lingua`.

## Current focus

Course catalogue synced with ijlapsukunda.com: 19 languages, 14 tech, 7 business, 5 TVETA, 4 professional, 3 vocational programmes. 84 static pages. Full opendesign audit completed — 41 violations fixed. Remaining work: swap ui-avatars/Unsplash for real imagery, add Frappe CMS backend for dynamic content.

## Active issues

- #1–#7: Foundational scaffolding (mostly done)
- #8–#16: Astro/Tailwind/TailGrids integration (done)
- #17–#27: Pages and features (all done, closed)
- New issues needed for: Professional/Vocational programme categories, course catalogue sync

## Blockers

_None._

## Recent decisions

- Full opendesign audit completed across all 28 pages + components — 41 violations fixed: dead `.card` class swept from 21 files, backdrop-blur removed, non-token colors replaced, gradient decoration removed.
- Course catalogue expanded from real data at ijlapsukunda.com: 9 new languages (Dutch, Polish, Korean, Turkish, Norwegian, Latin, Greek, Sign Language, Local Languages), 4 Professional courses (Tour Guiding, Front Office, Tours & Travel Ops, Airline Cabin Crew), 3 Vocational courses (Hairdressing, Computer Packages, Madrasa).
- Program type system extended with `'Professional' | 'Vocational'` categories.
- Navbar updated: Languages dropdown now includes all 19 languages; Programs dropdown includes Professional Courses and Vocational Training.
- 84 static pages built (up from 66), all design-token-compliant.
- TailGrids Card adopted across ALL pages: 44 manual card divs replaced in 22 files. Card.tsx fixed (missing CardTitle export re-added). Every content card on the site now uses the standardised TailGrids Card component tree.
- Alert adopted on 4 additional pages (tuition-fees, contact, how-to-apply, online-education). Badge added to 6 more pages. buttonStyles migrated to canonical TailGrids source in 23 files.
- Copy voice sweep completed: 7 files cleaned (experience → factual alternatives). Zero gradients, zero raw hex, zero decoration anti-patterns confirmed across all 84 pages.
- Issue #28 closed after 4 sweeps.
- TailGrids components expanded from 5 to 15: added Separator, AspectRatio, Avatar, Breadcrumbs, Table, List, Link, Progress, Tabs, Skeleton.
- Breadcrumbs: 17 pages. Table: 2 pages. List: 10 pages. Separator: 15 pages. Avatar: 3 pages. Link: 5 pages+1. AspectRatio: blog.
- Accordion SSR error fixed (context hooks return safe defaults). Avatar rewritten native to avoid Base UI SSR error.
- Bundle budget installed (300KB JS / 200KB CSS threshold). All pass.
- Issues #15 and #16 closed.
- Light + Dark theme fully implemented: CSS variable tokens auto-switch via `.dark` class. Toggle in header with localStorage persistence. Dark-mode primary `#ff3333` for AA contrast.
- Visual regression tests set up: Playwright with 56 baseline screenshots (28 pages × light + dark). Run via `npm run test:visual`.
- All 84 pages updated with dark mode support (token replacements + `dark:` variants).
- Bundle: 194.6 KB JS, 75.2 KB CSS, all budgets pass.
- **Vodafone-red brand migration**: primary `#E60000`, primary-focus `#B30000`, primary-subtle `#FEF2F2`, secondary charcoal `#1B1B1B`, ink `#0F0F0F`. Blue classes swept across 12 pages (15 swaps); broad sweep added `border/ring/from/to/via/fill/stroke/placeholder/caret/accent/divide/outline/shadow` blue→primary replacements (3 more) plus `bg-emerald-*/text-emerald-*` removal. DESIGN.md rewritten with explicit Tailwind v4 / TailGrids / Astro 7 usage guidance.
- **TailGrids roll-out**: `Card` adopted on language tiles, course tiles, event tiles, blog tiles, and instructor tiles (SSR-only, zero hydration cost). `Alert` adopted on `/dates-deadlines` and `/financial-aid`. TailGrids `Accordion` removed from `/faq` because it threw `useItemContext must be used within an ItemContext Provider` at Astro SSR; replaced with native `<details>/<summary>` styled with our tokens (accessible by default, zero JS). `CardTitle` heading-level regression caught by reviewer: tile cards now render native `<h2>` on `/courses`, `/events`, `/blog`, `/instructors` and native `<h4>` on `/languages` so the document outline reads h1 → h2 → h3 (sub-section) → h4 (item).
- **Tokens extended**: `@theme` now declares `--color-warning`, `--color-warning-subtle`, `--color-success`, `--color-success-subtle`, so `bg-warning`/`text-warning`/`bg-success`/`text-success` resolve. Dead code cleaned up: `.card` component class removed from `@layer components`; dead `CardTitle` export removed from `frontend/src/components/tailgrids/core/card.tsx`.
- **Newsletter backend wiring**: `createSubscriber()` in `frontend/src/lib/api.ts` now routes through the existing `Lead` DocType (via `createLead`) so the footer email-form works out of the box without a new DocType. `PUBLIC_NEWSLETTER_SOURCE=Newsletter` documented in `frontend/.env.example`; overridable per environment.
- **GitHub tracking**: GitHub issue with title `TailGrids roll-out: Card across content tiles + native FAQ + newsletter helper` opened for this work and added to the IJLAPS Website project board.
- **Newsletter form live on every page**: Footer `action="/api/newsletter" method="POST"` replaced with `id="newsletter-form"` and inline `<script>` that imports `initNewsletterForm` from `frontend/src/scripts/newsletter`. Status div has `aria-live="polite"` so screen readers announce loading / success / error transitions.
- **Stat-row bands**: `/events`, `/blog`, `/departments` each gained a 4-stat "at a glance" row + a sr-only `<h2>` so screen readers see the band as a labelled section.
- **Topic chips on /blog**: A clickable row (Education, Languages, Stories, Events, Admissions) sits above the post grid.
- **Monored discipline on /departments**: The four department icons previously used `bg-red-50 / bg-amber-50 / bg-purple-50`. Standardised all four to `bg-primary-subtle text-primary` for the Vodafone-only palette.
- **Two more events on /events**: "Cohort Showcase & Demo Day" (28 Jun 2026) and "Admissions Q&A Live" (12 Jul 2026, online) added to the catalog.
- **Stat-band polish on /leadership and /schools**: added 4-stat "By the numbers" rows (6 executive leads / 4 board / 4 dept heads / 25+ years; 4 schools / 10 languages / 26+ programmes / 5 TVETA trades) with `sr-only <h2>` headings for screen-reader labelling, preserving the h1 → h2 hierarchy.
- **Pexels imagery migration (abandoned, fall-back to native hero bands)**: a 56-slot manifest was generated, but the user-supplied Pexels API key returned HTTP 403 Forbidden on the very first query, blocking the download loop. Rather than couple the build to a working third-party key, the migration has been retired and the script (`frontend/scripts/pexels-migrate.sh`), partial manifest, and per-page dedupe ledger were cleaned up. The existing screenshot path remains: `/instructors.astro` continues to use `https://ui-avatars.com/api/...` PNGs (alt text now honest: "Representational photo for ${name}, ${role}"), `/blog.astro` keeps its `https://images.unsplash.com` hero covers (decorative `alt=""`), and the 11 detail pages use the existing dark `bg-slate-900` hero bands as their visual anchor. If a working Pexels key (or another stock service) becomes available, the migration can be reinstated as opt-in via `frontend/.env` (`source frontend/.env && bash ...`), the script kept out of the tracked tree, and the page-rewrite step must anchor on `bg-slate-900` sections rather than fragile class-based regex.
- **Image-mapping audit pass + GitHub sync complete**: scanned `frontend/src/**` for every image reference. Confirmed 10 total refs: 6 `ui-avatars.com` URLs mapped to `/instructors` faculty grid cards (lines 22, 29, 36, 43, 50, 57); 4 `Unsplash` URLs mapped to `/blog` post grid covers (lines 15, 22, 29, 36). All references preserved verbatim by Astro at build time. Node v22.23.1 build re-emits 66 HTML pages. Created tracking issue **#38** ("Image mapping audit + Pexels migration retirement") on `IsaacMorzy/lingua` with the full per-page table; commented on issue #26 linking to #38 so the TailGrids roll-out stays decoupled from the image story. Issue list at end of run: #27 (new), #26, #25-#20 (existing).
- **Writing-skill (ai-writing-auditor) cleanup pass**: scanned `frontend/src/` for em dashes + Tier-1 AI-isms. Frontmatter was already clean from prior passes (zero `delve`/`paradigm`/`leverage`/`utilize`/`pivotal`/`seamlessly`/`holistic`/`paramount`/`synergy`/`foster`/`elevate`/`cornerstone`/`leverage` hits). Only three em dashes survived on `frontend/src/pages/contact.astro` ("Monday — Friday" range and two time-range em dashes). A naive `\s\u2014\s` → `, ` substitution produced "Monday, Friday: 8:00 AM, 5:00 PM" which read as a *list* of days rather than a *range*. Micro-fix applied to use literal "to": "Monday to Friday: 8:00 AM to 5:00 PM." All other em dashes were already in pure-prose contexts where the comma read cleanly. Build succeeded; reviewer verdict: No blockers.

## Recent design corrections

- StatRow extracted to reusable component; 5 pages adopted it.
- Department cards: left-border accent per card replaces monored flat look; dead `.card` class swept.
- Opendesign audit: `backdrop-blur` removed from hero stat cards; `text-yellow-300` → `text-warning`; `Hero stat` eyebrow → `Key stat`.
- GitHub issues #17–#27 closed as completed.

## Previous design corrections

- **CTABand body contrast**: `text-slate-200` on Vodafone red registered ~3.3:1 (fail AA). Replaced with `text-white/85` (~5.0:1, AA).
- **Hero system drift**: removed emerald-900 eyebrow chip (replaced with `bg-white/15 text-white`) and removed the dark decorative orb to keep the red-only discipline.
- **Footer token alignment**: footer root `bg-slate-900` swapped to the brand `bg-ink` (`#0F0F0F`); newsletter input background to `bg-ink-soft`.
- **Token catalogue in @theme**: added `--color-ink`, `--color-ink-soft`, `--color-warning`, `--color-warning-subtle`, `--color-success`, `--color-success-subtle`. Dead `--color-on-primary`, `--color-canvas`, `--color-canvas-soft` removed once their classes were no longer referenced.
- **Newsletter form a11y polish**: form discarded the dead `action="/api/newsletter"` attribute (no endpoint existed → no-JS users would 404); status div now uses `aria-live="polite"` so screen readers announce loading/success/error transitions.
- **Stat row sections need labels**: sr-only `<h2>` headings inserted before each band so screen readers see a labelled section rather than an unlabelled band.

## Completed this run

- **Full opendesign audit** across all 28 pages — 41 violations fixed (35 dead `.card` classes, backdrop-blur, non-token colors, gradient decoration).
- **Second design sweep** — 18 more violations fixed (copy voice, badge colors, body contrast on red bands).
- **Third accessibility sweep** — contrast fix on `/faculty`, `prefers-reduced-motion` global CSS, `motion-safe:` animation guard on blog images. Zero-violation verification completed.
- **Course catalogue synced** from ijlapsukunda.com — 18 new programmes added.
- **9 new languages**: Dutch, Polish, Korean, Turkish, Norwegian, Latin, Greek, Sign Language, Local Languages.
- **4 Professional courses**: Tour Guiding & Administration, Front Office, Tours & Travel Operations, Airline Cabin Crew.
- **3 Vocational courses**: Hairdressing, Computer Packages, Madrasa.
- **Type system extended**: Program category now supports Professional + Vocational.
- **Navbar restructured**: Languages in 3-column grid; Programs in grid; `wide` mega-menu support.
- **GitHub**: Issue #28 created, added to IJLAPS Website project, 2 comments documenting sweeps.
- **Build**: 84 pages (up from 66).

## Issues

- **#11 (Level systems)** — `ready-for-human`. Page exists at `/level-systems/` but Frappe backend unavailable. Needs: running Frappe site, detail pages for individual systems.
- **#13 (Frappe API)** — `ready-for-human`. `api.ts` exists with GET/POST helpers. Needs: CSRF token handling, auth session management, error responses.

All other issues closed as already-implemented (7 total).

## Active work

- Swap ui-avatars instructor placeholders on `/instructors` for real portraits sourced from the Frappe `lingua_instructor` DocType.
- Replace Unsplash placeholders on `/blog` with cms-managed imagery.
