# DESIGN.md - IJLAPS Website (Vodafone-Red Theme)

> Design system for the IJLAPS (International Joint Languages and Professional Studies) public website.
> Built with **Astro 7**, **Tailwind CSS v4** (CSS-first tokens via @theme), and **TailGrids UI CLI**
> React primitives. Brand identity inspired by **Vodafone's classic brand language**:
> a signature red (#E60000), generous white editorial space, charcoal ink type, and a confident voice.

---

## 1. Brand Identity

- **Mission:** TVETA-certified languages, technology, and business programmes that build workforce-relevant
  skills for the Kenyan and East African economy.
- **Tagline:** *“Education that connects worlds.”* — straightforward, confident, never hyperbolic.
- **Core Values:** Excellence · Inclusivity · Integrity · Accessibility.
- **Voice:** Confident, plain-spoken, low-adjective. Numbers carry the weight. Avoid SaaS clichés
  (`unlock`, `transform`, `elevate`).
- **Design Posture:** *Editorial discipline on a white canvas, anchored by signature red.*

## 2. Brand Tokens (Vodafone Red)

| Token | Hex | Role |
|---|---|---|
| `primary` | `#E60000` | Vodafone Red — primary CTA, brand mark, focus ring, link accent. |
| `primary-focus` | `#B30000` | Hover / active state for primary surfaces. Required 4.5:1 contrast. |
| `primary-subtle` | `#FEF2F2` | Pale red tint for badge backgrounds, soft accents, hero stats cards. |
| `secondary` | `#1B1B1B` | Charcoal ink for secondary content emphasis, inactive CTAs. |
| `secondary-focus`| `#000000` | Active state for secondary surfaces. |
| `ink` | `#0F0F0F` | Hero band, footer, dark editorial surfaces. |
| `ink-soft` | `#1A1A1A` | Slightly lighter ink for inputs and dividers. |
| `body` | `#475569` | Secondary body copy on light surfaces. |
| `mute` | `#94A3B8` | Tertiary metadata, footer dividers. |
| `success` | `#047857` | Success states, completion metrics. |
| `warning` | `#B45309` | Warnings, deadlines, intake alerts. |
| `error` | `#DC2626` | Errors, validation. |
| `info` | `#1B6FB3` | Informational links. |

**Token source-of-truth:** `frontend/src/styles/global.css` inside the `@theme` block — any visual
decision reads through `bg-primary`, `text-primary-focus`, `bg-primary-subtle`, etc. Never use
arbitrary `bg-[#hex]` classes.

**WCAG verification (must hold):**
- `#E60000` on `#FFFFFF` → 4.79:1 ✅ AA for normal text.
- `#FFFFFF` on `#E60000` → 4.79:1 ✅ AA.
- `#B30000` on `#FFFFFF` → 6.30:1 ✅ AAA.
- `#FEF2F2` (subtle) with `#B30000` text → 5.95:1 ✅ AA.
- `#1B1B1B` on `#FFFFFF` → 17.4:1 ✅ AAA.

## 3. Typography (`Inter`)

One family. Network-loaded from Google Fonts with preconnect.

| Token | Size / Weight | Use |
|---|---|---|
| `display-hero` | 56px / 800 / -0.02em tracking | Hero headlines (uppercase-first or sentence case). |
| `display-xl` | 48px / 700 / -0.01em | Section openers on marketing pages. |
| `display-lg` | 36px / 700 | Major section titles (H2). |
| `display-md` | 30px / 700 | Sub-section (H3). |
| `display-sm` | 24px / 700 | Card titles (H4). |
| `eyebrow` | 14px / 700 / +0.05em UPPERCASE | Section eyebrows. White-on-primary band. |
| `body-lg` | 20px / 400 / line-height 1.55 | Lead paragraphs. |
| `body` | 16px / 400 / line-height 1.7 | Default body. |
| `body-sm` | 14px / 400 / line-height 1.5 | Captions, meta, footer. |
| `button` | 16px / 600 / line-height 1.5 | Button labels (NO uppercase). |

## 4. Layout Grid & Spacing

- **Container:** `max-w-7xl` (1280px), padding `16/24/32 px` per breakpoint.
- **Grid:** 12 columns at `lg+`, 8 columns at `md`, 4 columns at `sm`.
- **Section rhythm:**
  - Marketing section: `py-16 md:py-24`.
  - Hero band:        `py-20 md:py-32`.
  - Chapter band:     `py-12 md:py-16` (slim accent divider band).
- **Band polarity:** alternate `bg-white` and `bg-slate-50` (Tailwind neutrals, not token classes). Chapter bands use `bg-primary` (red
  full-bleed) interspersed as bold dividers — a Vodafone editorial signature.

## 5. Component Patterns

### Buttons

`frontend/src/styles/button.ts` (CVA factory) maps directly to TailGrids CSS variables so a single source
of truth governs Astro `<a>` tags and TailGrids `<Button>` React islands.

| Variant | Spec |
|---|---|
| `primary` fill | `bg-primary text-white hover:bg-primary-focus` — the Vodafone red block. One per page primary action. |
| `primary` outline | `border-2 border-primary text-primary hover:bg-primary-subtle` — secondary CTAs (max **one per card**). |
| `ghost` | `text-primary hover:bg-primary-subtle` — tertiary, plain links, language navigation. |
| Size | `xs/sm/md/lg` matched to `TailGrids` `buttonStyles()` so a CvA call aligns 1:1. |
| Radius | `rounded-md` (8px). Pill radius reserved for badges/eyebrows only. |
| Focus | 2px primary ring, 2px offset; never removed. |
| Disabled | 38% opacity, no `disabled:opacity-50`. |

### Badges

`frontend/src/components/tailgrids/core/badge.tsx` — primary/success/warning/error/neutral variants.
In IJLAPS theme: primary uses `bg-primary-subtle` with `text-primary-focus` so AA contrast passes.

### Cards

`frontend/src/components/tailgrids/core/card.tsx` — used for language tiles, programme tiles, faculty tiles,
and testimonial tiles. Spec: `bg-white`, `border 1px border-slate-200` (light divider), `rounded-xl` (12px), padding
`p-6`, hover `shadow-sm`. ONE secondary CTA per card maximum (rule).

### Alert

`frontend/src/components/tailgrids/core/alert.tsx` — used for admissions deadline notices, bursary window
alerts, refund policy reminders. Default `color="warning"` for pending deadlines.

### Accordion

`frontend/src/components/tailgrids/core/accordion.tsx` — used for FAQ (`/faq`) and grouped intake calendar
on `/languages/[slug]`.

### Hero / PageHero

`frontend/src/components/Hero.astro` and `PageHero.astro` — dark slate or primary-red background with
white text. On dark hero, secondary copy uses `text-slate-300` (NEVER red-tinted — fails AA on dark slate).
On primary-red hero, body copy uses `text-white/80` (NEVER `text-red-50/100/200` — fails AA on the red band).

### Footer

`frontend/src/components/Footer.astro` — `bg-ink` (#0F0F0F) with white text. Subtle layer was deprecated;
footer is intentionally high-contrast editorial.

## 6. Use TailGrids components where they fit

When a TailGrids component exists in `frontend/src/components/tailgrids/core/`, prefer it over a custom
Astro component for:
- **Card** → language tiles, faculty cards, programme tiles, testimonials.
- **Alert** → admissions deadline, bursary window, refund policy, intake cutoff.
- **Accordion** → FAQ groups, language calendar by year.
- **Badge** → category tag, exam-board tag, intake/level indicator.

For simple interactive elements (e.g., buttons), the custom CVA `buttonStyles()` factory remains
preferred because Astro native `<a>` tags avoid React island hydration on marketing pages.

## 7. Tailwind v4 — CSS-First Tokens

Tailwind v4 reads tokens from `@theme` in `frontend/src/styles/global.css`. **Add new tokens there, not
inline.** Custom utilities gained:

| Token class | Use |
|---|---|
| `bg-primary` | Vodafone Red surface. |
| `bg-primary-subtle` | Pale-red pill backgrounds. |
| `text-primary` | Brand-coloured links and inline emphasis. |
| `text-primary-focus` | Heavier accent text. |
| `border-primary` | Strong accent borders. |
| `ring-primary` | Focus rings. |
| `bg-ink` | Hero band, footer, dark editorial surfaces. |
| `bg-ink-soft` | Slightly lighter ink for inputs and dividers. |

## 8. Astro 7 Page Conventions

- **Layout:** `frontend/src/layouts/Layout.astro` — accepts `title`, `description`, `canonicalPath`,
  `keywords`, `ogImage`, `noindex`, `jsonLd` (array). Injects organisation JSON-LD by default.
- **Pages:** under `frontend/src/pages/`. Dynamic routes use Astro `getStaticPaths`.
  - Languages: `[slug].astro`, group `/languages/index.astro`.
  - Programmes: `[category]/index.astro`, `[category]/[slug].astro` for detail.
- **`Astro.url.pathname`** drives active-nav highlighting.
- **Server-rendered first**, React islands only for interactive TailGrids components.

## 9. Accessibility

- Visible 2px primary focus ring on every interactive element.
- WCAG AA across all body text (verified in §2).
- Heading hierarchy: 1 → 2 → 3, never skipped.
- Semantic `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- `prefers-reduced-motion` respected on hover/scroll reveals.
- 44 × 44 px minimum touch targets (links and buttons inside cards).

## 10. Voice discipline

- Function-first illustrations. No decorative gradients. No blur on content.
- Marketing copy:
  - Numbers in **bold**, e.g. *“94% first-sitting pass-rate”*.
  - Avoid `spacious`, `endless`, `dream`, `perfect`, `unlock`, `transform`, `reimagine`.
  - Avoid em-dash for tone; use commas or full stops.
  - Sentence case for body; uppercase for eyebrows only.

## 11. Do's and Don'ts

### Do
- Use `bg-primary` blocks as bold chapter bands sparingly (think once per long page, twice on the
  home page).
- Pair every hero with one primary CTA (red) and one outline CTA (red border, pale fill on hover).
- Type every CTA as a verb the user can act on: *Apply, View programme, See intake dates, Apply now.*

### Don't
- Use more than one accent colour in a single page/section.
- Use `bg-gradient-to-br` on a content surface.
- Use violet/indigo — Vodafone theme is monored + neutral.
- Rely on colour alone: every state has an icon or label.

## 12. Implementation Checklist (per page)

- [ ] Every colour maps to a token class (no arbitrary `bg-[#hex]`); page band polarity uses Tailwind neutrals (`bg-white` / `bg-slate-50`) instead of token classes.
- [ ] Type uses the documented scale; no `text-[Npx]`.
- [ ] Section rhythm follows §4.
- [ ] One accent CTA per page; ONE secondary CTA per card.
- [ ] Visible `:focus-visible` on every interactive element.
- [ ] Disabled state at 38% opacity (component-level).
- [ ] No SaaS marketing clone in copy.
- [ ] Decoration removed unless it carries information.
- [ ] Mono style applied to: prices, dates, addresses, KES amounts.
- [ ] Layout survives `prefers-reduced-motion`.

## 13. Sources

- `frontend/tailgrids.css` (root) — base TailGrids custom-properties (dark theme defaults).
- `frontend/src/styles/global.css` — @theme override of all IJLAPS tokens.
- `frontend/src/components/tailgrids/core/*` — installed TailGrids primitives.
- `frontend/src/styles/button.ts` — CVA factory mapped onto TailGrids CSS variables.
- Vodafone brand tokens (#E60000, #B30000, #1B1B1B, #F4F4F4) sourced from publicly published brand
  guidelines (CEO.CA, Behance case studies, Vodafone press).
