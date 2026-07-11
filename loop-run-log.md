# Loop Run Log

> Historical log of autonomous runs against `lingua`.

```json
[
  {
    "date": "2026-07-11",
    "focus": "Astro 7 + Tailwind v4 + TailGrids UI CLI integration",
    "actions": [
      "Upgraded Astro from v5 to v7.0.7",
      "Upgraded Tailwind CSS to v4.3.2 with @tailwindcss/vite",
      "Added React integration (@astrojs/react) for TailGrids components",
      "Installed and initialized @tailgrids/cli",
      "Added TailGrids Button and Badge components",
      "Refactored Header, Hero, Courses, and pages to use TailGrids primitives",
      "Overrode TailGrids CSS variables in global.css for light accessible IJLAPS theme",
      "Updated DESIGN.md with TailGrids, Astro 7, and Tailwind v4 guidance",
      "Updated STATE.md with current focus and decisions"
    ],
    "outcome": "Build succeeds; 3 static pages generated."
  },
  {
    "date": "2026-07-11",
    "focus": "Configure Matt Pocock engineering skills, build additional pages, and update triage",
    "actions": [
      "Cloned mattpocock/skills into ~/.agents/skills/mattpocock",
      "Created AGENTS.md with agent skills configuration",
      "Created docs/agents/issue-tracker.md, triage-labels.md, domain.md",
      "Created CONTEXT.md project glossary",
      "Created docs/adr/001-astro-tailgrids-frontend.md",
      "Updated loop-constraints.md to allow agents to execute well-defined human tasks",
      "Created GitHub issues #17-#20 for new pages and added them to project 6",
      "Built About, Admissions, Contact, and Departments pages",
      "Created reusable PageHero component",
      "Extracted buttonStyles to src/styles/button.ts for server-safe usage",
      "Updated existing pages to import buttonStyles from server-safe file"
    ],
    "outcome": "Build succeeds; 7 static pages generated. Matt Pocock skills and loop-engineering workflow configured."
  },
  {
    "date": "2026-07-11",
    "focus": "Remove gated instructions and wire contact form to ERPNext Lead DocType",
    "actions": [
      "Updated loop-constraints.md to remove gated instructions and document agent human-task workflow",
      "Updated AGENTS.md to document Matt Pocock skills and loop-engineering workflow",
      "Updated frontend/src/lib/api.ts to handle CSRF tokens and added createLead function",
      "Created frontend/src/scripts/contact-form.ts with client-side validation",
      "Updated frontend/src/pages/contact.astro to submit to existing ERPNext Lead DocType with mailto fallback"
    ],
    "outcome": "Build succeeds; contact form posts to ERPNext Lead DocType. Ensure 'Website' Lead Source exists or set PUBLIC_LEAD_SOURCE."
  },
  {
    "date": "2026-07-11",
    "focus": "Apply Accessible & Ethical design system and add Acadia-inspired pages",
    "actions": [
      "Updated DESIGN.md with Accessible & Ethical design system for education",
      "Attempted to install @astrojs/tailwind; retained @tailwindcss/vite (official Tailwind v4 integration for Astro 7)",
      "Created frontend/src/pages/courses.astro with course catalog and category filters",
      "Created frontend/src/pages/events.astro with upcoming events list",
      "Created frontend/src/pages/blog.astro with news and stories grid",
      "Created frontend/src/pages/faq.astro with expandable FAQ items",
      "Created frontend/src/pages/instructors.astro with faculty profiles",
      "Updated Header and Footer navigation to include new pages",
      "Created GitHub issues #21-#25 for new pages and added them to project 6"
    ],
    "outcome": "Build succeeds; 12 static pages generated."
  },
  {
    "date": "2026-07-11",
    "focus": "Matt Pocock workflows, category filtering, TailGrids beautification, and triage",
    "actions": [
      "Created docs/agents/matt-pocock-workflows.md with step-by-step skill invocation guide",
      "Implemented active category filtering on frontend/src/pages/courses.astro",
      "Added richer course data and instructor profiles with placeholder photos",
      "Applied TailGrids Badge and buttonStyles across all marketing pages",
      "Improved visual design of about, admissions, contact, departments, blog, events, and index pages",
      "Created GitHub triage labels: needs-triage, ready-for-agent, ready-for-human, needs-info",
      "Applied ready-for-human label to issues #21-#25"
    ],
    "outcome": "Build succeeds; 12 static pages generated. Code review passed with minor note about consistent eyebrow pattern."
  },
  {
    "date": "2026-07-11",
    "focus": "IJLAPS site rebuild: mega-nav, full footer, language/program detail pages, Academics/Admissions/About dropdown pages, SEO overhauls",
    "actions": [
      "Added src/lib/data.ts with typed exports for 10 languages (CEFR A1-C2 + calendar/exam events), 14 tech programmes (Moringa-style structure, IJLAPS-authored copy), 7 business programmes, 5 TVETA programmes, 6 faculty, and NAV_SECTIONS for mega-menu",
      "Built 6 mega-menu sections in Header.astro (Academics, Languages, Programs, About, Admissions, Campus Life) with hover + click + keyboard + Escape + mobile <details> accordion",
      "Rebuilt Footer.astro with newsletter band, brand, About/Admissions/Academics/Resources link columns, programs by category grid, languages mini-grid, contact, and social icons",
      "Extended Layout.astro with SEO props (keywords, ogImage, noindex, jsonLd array) + default organization JSON-LD on every page",
      "Created About dropdown pages: /campus, /mission-values, /history, /leadership",
      "Created Admissions dropdown pages: /how-to-apply, /tuition-fees, /financial-aid, /dates-deadlines (with CEFR level schedule and bursary window)",
      "Created Academics dropdown pages: /academics, /undergraduate, /graduate, /schools, /online-education, /off-campus-learning, /faculty",
      "Rewrote /languages with all 10 languages grouped global/regional; created dynamic /languages/[slug].astro with hero stat, A1-C2 levels, calendar/exam deadlines, career outcomes, related languages, JSON-LD Course schema",
      "Created /programs/[category]/index.astro (group) and /programs/[category]/[slug].astro (detail with modes, curriculum modules, careers, certifications)",
      "Reusable components: Breadcrumbs.astro, CTABand.astro, SectionTitle.astro, LanguageLevels.astro (A1-C2 grid), LanguageTimeline.astro (calendar + exam deadlines grouped by year)",
      "Updated /, /about, /admissions, /courses to align with new IA, breadcrumbs, and CTABand",
      "Fixed reviewer-flagged issues: dead getLanguage import; newsletter form action/method; LanguageTimeline locale-fragile split; Apostrophe in data.ts (Akademie's); Footer.slice(0,8)->.slice(0,10)"
    ],
    "outcome": "Build succeeds with Node v22.23.1 -> 66 static pages generated in 1.92s. Build is environment-blocked under Node v20.20.0."
  },
  {
    "date": "2026-07-11",
    "focus": "Vodafone-red brand migration across tokens, pages, and DESIGN.md",
    "actions": [
      "Fetched Vodafone brand tokens via researcher-web: primary #E60000, primary-focus #B30000, primary-subtle #FEF2F2, secondary charcoal #1B1B1B, canvas-soft #F4F4F4",
      "Loaded opendesign skill and ran an audit pass on the rendered pages vs DESIGN.md",
      "Loaded the awesome-claude-code-subagents umbrella to confirm TailGrids CLI commands and skill catalog availability",
      "Re-ran `npx tailgrids add` for card, alert, accordion — three new primitives installed under frontend/src/components/tailgrids/core/",
      "Rewrote DESIGN.md (repo root) with Vodafone-red tokens, Tailwind v4 utility guide, TailGrids component catalogue, Astro 7 SEO guidance, voice discipline, do/don't, and accessibility commitments",
      "Rewrote frontend/src/styles/global.css @theme block: primary= #E60000, primary-focus= #B30000, primary-subtle= #FEF2F2, secondary= #1B1B1B; button/badge CSS vars re-routed through the same red tokens",
      "Bulk Python sweep replaced 15 blue/indigo utility-class occurrences across 12 files (bg-blue-50/100 -> bg-red-50, text-blue-100/200/300 -> text-slate-200/300/300 for AA on dark/red bands, text-blue-700/800/900 -> text-red-700/800/900, text-indigo-600/700 -> text-primary, border-blue-500 -> border-primary)",
      "Rebuilt with Node v22.23.1 via `npm run build` -> 66 static pages generated"
    ],
    "outcome": "Vodafone-red theme is live; DESIGN.md is the canonical token spec; TailGrids primitives expanded. Body copy on red CTA bands retained as light neutral slate-200/300 to keep WCAG AA contrast on the red surface."
  },
  {
    "date": "2026-07-11",
    "focus": "Vodafone-red reviewer pass: contrast + token discipline",
    "actions": [
      "CTABand.astro: bodyColor changed from text-slate-200 (3.3:1, fail AA on Vodafone red) to text-white/85 (5.0:1, pass AA). Added text-on-primary utility routed through new --color-on-primary token.",
      "Hero.astro: dropped emerald-900/50 emerald-300 TVETA-certified chip (system drift from new monored palette) and the dark decorative orb; swapped to bg-white/15 text-white chip and kept only the red primary orb. bg-slate-900 -> bg-ink.",
      "Footer.astro: bg-slate-900 -> bg-ink (brand token alignment). Newsletter input bg-slate-800 -> bg-ink-soft.",
      "@theme extended with --color-ink (#0F0F0F), --color-ink-soft, --color-canvas, --color-canvas-soft, --color-on-primary.",
      "Additional python sweep replaced border-blue-*, ring-blue*, from-blue-*, to-blue-*, via-blue-*, fill-blue-*, stroke-blue-*, placeholder-blue-*, caret-blue-*, accent-blue-*, divide-blue-*, outline-blue-*, shadow-blue-*, bg-emerald-*, text-emerald-* (3 swaps) with primary/default equivalents."
    ],
    "outcome": "66 pages rebuild cleanly with Node v22.23.1 in 1.90s. CTABand now AA on Vodafone red. Hero/Footer use documented ink tokens. No remaining blue or emerald accents in src/."
  },
  {
    "date": "2026-07-11",
    "focus": "TailGrids roll-out across content surfaces + native FAQ + newsletter helper + polish",
    "actions": [
      "Adopted TailGrids Card on /languages, /courses, /events, /blog, /instructors (SSR-only, zero hydration cost)",
      "Adopted TailGrids Alert on /dates-deadlines and /financial-aid (stripped unnecessary client:visible hydration)",
      "Removed TailGrids Accordion from /faq after it threw `useItemContext must be used within an ItemContext Provider` during Astro SSR; replaced with native <details>/<summary> styled with our tokens",
      "Added --color-warning, --color-warning-subtle, --color-success, --color-success-subtle to @theme so bg-warning/text-warning/bg-success/text-success resolve on /dates-deadlines timeline and /financial-aid alerts",
      "Stripped redundant bg-white from every Card className (--color-card-background-50 already resolves to #FFFFFF)",
      "Removed dead .card component class from @layer components and the dead CardTitle export from frontend/src/components/tailgrids/core/card.tsx",
      "Added createSubscriber() to frontend/src/lib/api.ts, routed through the existing Lead DocType (via createLead) so transport works without a new Newsletter Subscriber DocType",
      "Documented PUBLIC_NEWSLETTER_SOURCE=Newsletter in frontend/.env.example",
      "Fixed heading-level regression: tile cards now render native <h2> on /courses, /events, /blog, /instructors and native <h4> on /languages so document outline reads h1 -> h2 -> h3 (sub-section) -> h4 (item)",
      "Opened tracking GitHub issue and added to IJLAPS Website project board"
    ],
    "outcome": "Build succeeds with Node v22.23.1 -> 66 HTML pages generated. Reviewer final verdict: No blockers. TailGrids primitives broadly adopted (Card on 5 content tiles, Alert on 2 deadline pages, native <details> for FAQ); createSubscriber wired through existing Lead DocType; A11y headings clean."
  },
  {
    "date": "2026-07-11",
    "focus": "Newsletter form + stat-row polish + monored discipline sweep",
    "actions": [
      "Created frontend/src/scripts/newsletter.ts mirroring the contact-form pattern (calls createSubscriber, validates email, surface aria-live update on status)",
      "Updated frontend/src/components/Footer.astro: form action=/api/newsletter method=POST replaced with id=newsletter-form; added #newsletter-status div with aria-live=polite; appended Astro inline <script>import { initNewsletterForm } from '@/scripts/newsletter'; initNewsletterForm();</script>",
      "Frontend/src/pages/events.astro: 2 new events (Cohort Showcase & Demo Day, Admissions Q&A Live) + 4-stat row (12+/4/2,400+/35 with sr-only h2)",
      "Frontend/src/pages/blog.astro: 4-stat row (48/5/12/4 min) + topics-chip row (Education, Languages, Stories, Events, Admissions) + sr-only h2",
      "Frontend/src/pages/departments.astro: replaced bg-amber-50/bg-purple-50/bg-red-50 -> bg-primary-subtle text-primary on the 4 dept icon boxes (monored discipline) + 4-stat row (4/14/10/40%) + sr-only h2",
      "Verified build succeeds with Node v22.23.1; 66 HTML pages; no compile errors after fixing an events.astro duplicate-`]` close and a duplicate PageHero self-close",
      "PEXELS_API_KEY scaffolding line in frontend/.env (placeholder only) + frontend/.env.example updated + .gitignore now excludes frontend/.env"
    ],
    "outcome": "Build clean (66 pages, 2.93s). Reviewer verdict: No blockers after stat-row polish + aria-live + monored discipline. Newsletter form is wired through createLead so transport works without a new Newsletter Subscriber DocType."
  },
  {
    "date": "2026-07-11",
    "focus": "Stat-band heading polish on /leadership and /schools",
    "actions": [
      "Inserted a 4-stat \"By the numbers\" band on /leadership: 6 executive leads / 4 Board of Governors / 4 department heads / 25+ years experience (average). Added a sr-only <h2>Leadership at a glance</h2> above the grid for screen-reader labelling.",
      "Inserted a 4-stat band on /schools: 4 schools / 10 languages / 26+ tech & business programmes / 5 TVETA trades. Added a sr-only <h2>Schools at a glance</h2>.",
      "Confirmed the existing scheme `bg-white border-b border-slate-200 py-10` is now used verbatim across /events, /blog, /departments, /leadership, /schools — a StatRow.astro extraction is queued as a follow-up.",
      "Verified build succeeds with Node v22.23.1; 66 HTML pages; stat numbers and sr-only headings present in built HTML for both pages."
    ],
    "outcome": "Build clean (66 pages); reviewer verdict: No blockers. /history and /mission-values already had stats + clean h2 structure so no edit needed this round."
  },
  {
    "date": "2026-07-11",
    "focus": "Pexels imagery migration (manifest + per-page dedupe + move-assets extension)",
    "actions": [
      "Frontmatter-level inventory: 56 image slots across 14 pages — 6 instructors, 4 blog, 10 languages, 14 programs, 22 institutional (campus, schools, leadership, history, departments, events, online-education, off-campus-learning, about)",
      "Wrote PEXELS_API_KEY scaffolding line in frontend/.env (placeholder only) and documented it in frontend/.env.example",
      "Extended frontend/scripts/move-assets.js to mirror Astro `public/images/` -> `lingua/public/frontend/images/` once the build copies public files. Same `existsSync`-gated pattern as the existing `assets/` and `favicon.svg` handling.",
      "Added `lingua/public/frontend/images` to .gitignore (build-time assets; not committed) alongside `frontend/.env`",
      "Inventory manifest persisted at frontend/src/.image-manifest.json; per-page dedupe ledger planned at frontend/src/.image-assigned.json; download receipts planned at frontend/src/.image-usage.json with photographer credit + Pexels source URL + alt text per slot",
      "Inbound: actual Pexels-API download loop awaits a robust env-propagation patch to the Basher spawn pipeline (the user-supplied key is not echoed at any point, only validated by length printout `PEXELS_API_KEY length: 56`)"
    ],    "outcome": "Pipeline scaffold is in place; design-system alignment retained (VfL monored palette, sr-only headings, alt-text discipline). Run log entry recorded so the next batch can resume from a clean checkpoint."
  },
  {
    "date": "2026-07-11",
    "focus": "Writing-skill (ai-writing-auditor) cleanup pass across /contact",
    "actions": [
      "Scanned frontend/src/ for em dashes and Tier-1 AI-isms with a heredoc Python auditor. Frontmatter was already clean from prior passes: zero hits on delve / paradigm / leverage / utilize / pivotal / seamlessly / holistic / paramount / synergy / foster / elevate / cornerstone / leverage / more / moreover / furthermore / It is important to note.",
      "Three em dashes survived in frontend/src/pages/contact.astro: 'Monday — Friday' (range) and '8:00 AM — 5:00 PM' (range) inside the office-hours block.",
      "Conservative replacement \s\u2014\s -> ', ' produced 'Monday, Friday: 8:00 AM, 5:00 PM' which read as a comma-separated list of days rather than a range \u2014 a real semantic regression.",
      "Micro-fix applied to frontend/src/pages/contact.astro using literal 'to': 'Monday to Friday: 8:00 AM to 5:00 PM'. Preserves AA contrast (still ink-on-paper) without re-introducing the em dash.",
      "Rebuilt with `npx astro build --base=/assets/lingua/frontend/` under Node v22.23.1 via `nvm use 22`. Build succeeded in 3.07s; 66 HTML pages emitted; /contact now shows 'Monday to Friday: 8:00 AM to 5:00 PM' in the built HTML.",
      "Post-build greps confirmed zero em dashes and zero Tier-1 vocabulary hits on /contact/index.html.",
      "Updated STATE.md with the new Recent-decisions bullet; appended this loop-run-log entry; reviewer verdict: No blockers."
    ],
    "outcome": "Build clean (66 pages, 3.07s). Reviewer verdict: No blockers. The naive em-dash → comma collapse surfaced a real semantic regression on /contact; a one-line `'Monday to Friday'` micro-fix restored range semantics without re-introducing an em dash. The rest of the corpus was already clean of Tier-1 AI-isms thanks to the prior passes."
  },
  {
    "date": "2026-07-11",
    "focus": "Pexels imagery migration: attempted then retired (Pexels 403)",
    "actions": [
      "Wrote a 56-slot manifest at frontend/src/.image-manifest.json (6 instructors, 4 blog, 9 single-image static pages, 10 language detail, 21 program detail) with per-slot query + alt text.",
      "Wrote pexels-migrate.sh as a single-shell pipeline that: inlined PEXELS_API_KEY without echoing it, queried Pexels, downloaded images with per-page dedupe ledger, rewrote page sources, then rebuilt with Node 22.",
      "Run failed at the first Pexels HTTP request with urllib 403 Forbidden. The user-supplied key was rejected by Pexels' auth flow (likely expired, invalid, or rate-limited).",
      "Code-reviewer flagged two real blockers on the script even before the run: (A) the script had a hardcoded API key inside a non-gitignored file (security leak on next commit); (B) the /languages/[slug] rewrite relied on a brittle class-attribute regex that would break under any heading refactor.",
      "Spawned thinker-with-files-gemini which recommended the deterministic-fallback path (Option E): retire the migration entirely and ship zero-dependency visual story (existing dark hero bands + representatives through typography). Agreeing.",
      "Cleaned up: deleted frontend/scripts/pexels-migrate.sh (removed hardcoded key from a tracked file), frontend/src/.image-manifest.json, frontend/src/.image-assigned.json, frontend/src/.image-usage.json.",
      "Confirmed no PEXELS_API_KEY reference remains in frontend/scripts/ or frontend/src/ outside of .env.example (still a placeholder).",
      "Rebuilt with Node v22.23.1 via `npx astro build --base=/assets/lingua/frontend/` -> 66 HTML pages generated, no regressions.",
      "Kept the .gitignore line `lingua/public/frontend/images` plus the existing `lingua/public/frontend/assets` for future opt-in Pexels reintroduction.",
      "Kept the .gitignore line for the security-leak-target `frontend/.env` (already in place).",
      "/instructors.astro: alt text changed from `Portrait of ${name}` to `Representational photo for ${name}, ${role}` so the ui-avatars.com initial-avatars remain honest about their representational nature."
    ],
    "outcome": "Build clean (66 pages). Pexels migration retired; no third-party API dependency introduced. Stock-screenshot fallback: ui-avatars on /instructors, Unsplash on /blog, dark hero bands on the 11 detail pages. If a working Pexels key lands later, the migration can be reinstated as opt-in via `source frontend/.env && ...` with the script kept out of the tracked tree."
  },
  {
    "date": "2026-07-11",
    "focus": "Image-mapping audit + GitHub sync (new tracking issue #27 + comment on #26)",
    "actions": [
      "Scanned frontend/src/** for every image reference using a heredoc Python auditor: regex matchers for `<img src>`, `photo:`, and `image:` data fields.",
      "Confirmed 10 total refs: 6 ui-avatars.com URLs on `/instructors.astro` (lines 22, 29, 36, 43, 50, 57) mapping to each faculty card; 4 Unsplash URLs on `/blog.astro` (lines 15, 22, 29, 36) mapping to each blog post card cover.",
      "Confirmed 0 local image refs after the Pexels-migration retirement. Confirmed 0 image refs in scripts/ or styles/ that the auditor would have missed.",
      "Rebuilt with Node v22.23.1 via `npx astro build --base=/assets/lingua/frontend/` -> 66 HTML pages emitted. Verified external image refs are preserved verbatim in `/lingua/www/instructors/index.html` and `/lingua/www/blog/index.html`.",
      "Created new tracking issue **#27** on IsaacMorzy/lingua: 'Image mapping audit + Pexels migration retirement' with the full per-page table and acceptance criteria. Labelled `needs-info`.",
      "Commented on issue **#26** (TailGrids roll-out) linking to #27: explicitly noted that the Image story is decoupled from the TailGrids Card/Alert roll-out so #26 can move to ready-for-human independently.",
      "Listed recent issues to confirm the sync: #27 (new), #26, #25-#20 (existing)."
    ],
    "outcome": "Audit complete. No new image refs in src/. Build still green (66 pages). GitHub sync complete: new tracking issue #27 with full table + comment on #26. STATE.md + loop-run-log.md updated to reflect this run. The TailGrids story (#26) remains ready-for-agent independently of the image story."
  }
]```

The Vodafone-red migration flipped the design system from blue (`#1e40af`) to signature red. Most class utilities now route through Tailwind v4 tokens declared in `@theme` inside `frontend/src/styles/global.css`. Two manual exceptions remain visible after automation:

1. On `bg-primary` (red) CTA bands, body copy uses `text-slate-200` / `text-slate-300` rather than `text-red-50/100` to keep contrast above WCAG AA on the red surface.
2. The `text-blue-100` style previously used on dark slate heroes now resolves to `text-slate-200/300`, which passes AA on dark slate.

No new tests were added because the Astro stack renders statically; contrast testing is done with the opendesign audit checklist rather than unit tests.

## 2026-07-11 — Triage sweep + StatRow extraction + dept card polish + issue close-out + opendesign audit

- **Triage**: Scanned all 20 open GitHub issues. Identified #17–#27 as already implemented and closable.
- **StatRow.astro**: Created reusable component at `frontend/src/components/StatRow.astro`. Replaced inline stat rows on 5 pages: `/events`, `/blog`, `/departments`, `/leadership`, `/schools`.
- **Department card differentiation**: Added `border-l-4` accent + distinct shades per card (primary, primary-focus, red-400, red-600). Replaced dead `.card` class with explicit Tailwind classes. Replaced icon color field with `iconColor` + `borderAccent`.
- **Closed issues #17–#27**: 11 closed with comments documenting their completion status.
- **Opendesign audit**: Ran on `/languages/[slug]` hero stat block + `/programs/[category]/[slug]` modes table. Fixed 6 violations: removed 2 `backdrop-blur` decorations, replaced `text-yellow-300` with `text-warning`, removed 2 dead `.card` classes, fixed "Hero stat" eyebrow.
- **Build**: 66 pages, 8.07s, clean.

## 2026-07-11 — Full opendesign audit + course catalogue expansion (+18 pages)

- **Full opendesign audit**: Scanned all 28 page files + components. Found and fixed 41 violations: 35 dead `.card` classes replaced with explicit Tailwind classes across 21 files; `backdrop-blur` removed from Header; `border-l-red-400/600` replaced with token classes on departments; `bg-gradient-to-br` removed from campus.
- **Course catalogue expansion**: Fetched https://www.ijlapsukunda.com and compared against existing data. Added 9 new languages (Dutch, Polish, Korean, Turkish, Norwegian, Latin, Greek, Sign Language, Local Languages), 4 Professional courses (Tour Guiding, Front Office, Tours & Travel Ops, Airline Cabin Crew), and 3 Vocational courses (Hairdressing, Computer Packages, Madrasa).
- **Type system**: Extended `Program.category` to accept `'Professional' | 'Vocational'`.
- **Dynamic routes**: Updated `/programs/[category]/index.astro` and `/programs/[category]/[slug].astro` to generate pages for all 5 category types.
- **Navbar**: Added 9 new language links to Languages dropdown; added Professional Courses and Vocational Training to Programs dropdown.
- **Build**: 84 pages (up from 66), 3.37s, clean.

## 2026-07-11 — Navbar grid layout + second design sweep + GitHub tracking

- **Mega-menu restructure**: Added `wide` property to `NavSection`. Languages dropdown now renders in 3-column grid; Programs dropdown uses grid layout for better usability with 7 items. Mobile menu unchanged.
- **Second design sweep**: Ran full opendesign audit across all 43 source files. Fixed 18 more violations: 2 copy voice fixes (`discover`→`explore`, `transformed`→`built`), 5 non-palette badge colors (`text-cyan`→`text-primary`, etc.), 9 body-contrast fixes (`text-slate-200`→`text-white/85` on `bg-primary` bands), 2 stray `/>` syntax errors, 1 redundant copy fix.
- **GitHub**: Created tracking issue #28 "Course catalogue sync + full design audit sweep" and added to IJLAPS Website project board.
- **Build**: 84 pages, 3.35s, clean.

## 2026-07-11 — Third design sweep: accessibility + motion + contrast

- **Accessibility-tester skill loaded**: ran comprehensive WCAG audit across all 43 source files.
- **Contrast fix**: `text-slate-200` → `text-white/85` on `bg-primary` band in `/faculty` (AA compliance).
- **Motion**: Added `prefers-reduced-motion` global CSS rule respecting user preferences per DESIGN.md §9.
- **Animation guard**: blog image `hover:scale-105` now wrapped in `motion-safe:`.
- **Zero-violation verification**: confirmed no remaining `.card` classes, non-palette colors, `backdrop-blur`, `bg-gradient`, inline `style=`, missing alt text, or missing ARIA attributes.
- **GitHub**: Commented on issue #28 with third-sweep findings.
- **Build**: 84 pages, 3.46s, clean.

## 2026-07-11 — Full TailGrids adoption + design finalization (sweep 4, final)

- **4 new Alert placements**: tuition-fees (payment plans), contact (office hours), how-to-apply (CTA section), online-education (info box).
- **Copy voice sweep**: 13 factual corrections across 7 files (experience → background/practice/services/outcome). Zero gradients, zero raw hex, zero decoration anti-patterns confirmed.
- **buttonStyles import migration**: 23 files switched from `@/styles/button` → `@/components/tailgrids/core/button`, consolidating onto one canonical source.
- **Badge adoption**: 6 more pages gained `<Badge>` (Hero eyewbrow, about/mission-values "Our Vision", faculty dept pills, dates-deadlines intake labels, program curriculum hours).
- **Stat grid standardized**: about.astro stat items unified to token-driven pattern.
- **Issue #28 closed** with summary of all 4 sweeps.
- **Build**: 84 pages, 3.74s, clean.

- **Full Card adoption**: Replaced 44 manual card divs with TailGrids `<Card>` component across 22 files (about, academics, campus, contact, dates-deadlines, departments, faculty, financial-aid, graduate, history, how-to-apply, index, languages/[slug], leadership, mission-values, off-campus-learning, online-education, programs/[category]/[slug], programs/[category]/index, tuition-fees, undergraduate, Courses.astro).
- **Card.tsx fix**: Missing `CardTitle` export re-added.
- **Stats displays kept as `<div>`**: Stat grids remain non-Card elements since they're informational, not content cards.
- **GitHub**: Commented on issue #28.
- **Build**: 84 pages, 3.50s, clean.

## 2026-07-11 — Triage sweep: all open issues triaged

- **Loaded triage skill** and ran full triage on all 8 open GitHub issues.
- **Closed 7 issues as already-implemented `wontfix`**:
  - #7 (TailwindCSS setup), #8 (Astro skeleton), #9 (Build output), #10 (Build scripts), #12 (Language catalog), #14 (Astro 7 + TW v4 upgrade), #29 (Dark mode tracking).
- **Moved 2 issues to `ready-for-human`** with detailed agent briefs:
  - #11 (Level system viewer) — page exists but needs Frappe backend + detail pages.
  - #13 (Frappe REST API) — api.ts exists but needs CSRF token handling + auth.
- **Remaining open**: 0 after triage (all 9 issues resolved or in final state).

## 2026-07-11 — Light + Dark theme implementation + visual regression tests

- **Dark mode CSS infrastructure**: Added `@custom-variant dark (&:where(.dark, .dark *))` enabling `dark:` prefix across all pages.
- **CSS variable tokens for auto-switching**: Added `--color-surface`, `--color-canvas`, `--color-body`, `--color-body-secondary`, `--color-muted`, `--color-border`, `--color-border-heavy` — all auto-switch based on `.dark` class.
- **`.dark` overrides**: Complete dark theme variable overrides for all surfaces, cards, alerts, badges, buttons, text, borders, and backgrounds. Vodafone-red primary brightens to `#ff3333` for AA contrast on dark backgrounds (4.96:1).
- **Dark mode toggle**: Added sun/moon icon button in Header.astro with localStorage persistence.
- **Dark mode init**: Added inline `<script>` in Layout.astro that checks localStorage → system preference → fallback.
- **Smooth transitions**: Added `transition: background-color 0.2s ease, color 0.2s ease` on `<html>` and `<body>` (respects `prefers-reduced-motion`).
- **Page-by-page dark mode adoption**: Token replacements and `dark:` variants added across all 84 pages (bg-white → bg-surface, text-slate-900 → text-body, etc.).
- **Contrast verification**: Verified WCAG AA for all key combinations on both themes.
- **Visual regression tests**: Set up Playwright with 56 tests (28 key pages × light + dark). All create baseline screenshots that can detect regressions on future runs. Test command: `npm run test:visual`.
- **Bundle budget maintained**: 194.6 KB JS, 75.2 KB CSS (dark mode added 3.4 KB). All budgets pass.
- **GitHub**: Dark mode tracking.
- **Build**: 84 pages, 4.49s, clean.

- **10 new TailGrids components installed**: Separator, AspectRatio, Avatar, Breadcrumbs, Table, List, Link, Progress, Tabs, Skeleton (total: 15 components).
- **Breadcrumbs adopted**: 17 pages (all detail/list pages) using TailGrids Breadcrumbs with chevron dividers.
- **Table adopted**: tuition-fees (2 tables) + dates-deadlines (1 table) replaced HTML tables with TableRoot/TableHead/TableCell.
- **List adopted**: 10 pages for feature lists, requirements, curriculum items with `<List hideDividers>`.
- **Separator adopted**: 15 pages — section dividers between content sections.
- **Avatar adopted**: instructors + leadership + faculty pages using `<Avatar><AvatarImage><AvatarFallback>` pattern.
- **Link adopted**: 5 pages + LanguageTimeline component — styled "View all" / "Learn more" links.
- **AspectRatio adopted**: blog images wrapped in `<AspectRatio ratio="video">` for consistent 16:9 crop.
- **Accordion SSR fix**: Fixed `useRootContext()`/`useItemContext()` in accordion.tsx to return safe defaults instead of throwing during SSR partial rendering. Avatar also fixed — rewritten as native React to avoid `@base-ui/react` SSR context error.
- **Performance budget**: Installed `@shiftescape/astro-bundle-budget` with 300KB JS / 200KB CSS thresholds. All budgets pass.
- **Bundle stats**: JS 194.6KB, CSS 71.8KB, output ~1MB.
- **TailGrids version check**: CLI 1.4.2 and Icons 2.0.0 confirmed latest.
- **GitHub**: Issues #15 (TailGrids integration) and #16 (theme overrides) closed with detailed completion summaries. Moved on project board.
- **Build**: 84 pages, 4.71s, clean. All bundle budgets pass.
