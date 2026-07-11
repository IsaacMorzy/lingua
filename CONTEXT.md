# CONTEXT

> Living glossary and context for the `lingua` project.

## Project

`lingua` is a Frappe app for managing language learning programs. It includes a public Astro frontend for the IJLAPS (International Joint Languages and Professional Studies) website.

## Glossary

- **IJLAPS** — International Joint Languages and Professional Studies, a TVETA-certified institution in Kenya.
- **TVETA** — Technical and Vocational Education and Training Authority (Kenya).
- **Frappe** — Python web framework used for the backend and admin interface.
- **DocType** — Frappe data model. Key DocTypes: `Lingua Language`, `Lingua Level System`.
- **Astro** — Static site generator for the public frontend.
- **Tailwind CSS** — Utility-first CSS framework.
- **TailGrids** — UI component library used via its CLI.
- **Frappe REST API** — Backend API consumed by the Astro frontend at build time.

## Current decisions

- Astro frontend lives in `frontend/`.
- Build output goes to `lingua/www/` (HTML pages) and `lingua/public/frontend/` (assets).
- Tailwind v4 with `@tailwindcss/vite`.
- TailGrids UI CLI for React-based UI primitives (15 components installed: Card, Badge, Alert, Button, Separator, AspectRatio, Avatar, Breadcrumbs, Table, List, Link, Progress, Tabs, Skeleton, Accordion). All used SSR-only. Accordion SSR error fixed (context hooks return safe defaults).
- Vodafone-red brand palette: primary `#E60000`, primary-focus `#B30000`, primary-subtle `#FEF2F2`.
- All 84 pages built; TailGrids Card adopted universally; buttonStyles from canonical `@/components/tailgrids/core/button`.
- Copy voice: engineering register, no marketing adjectives, no em-dash tone, no exclamation marks outside alerts.
- Design sweeps complete (4 sweeps, 62 violations + 44 Card adoptions).
- Dark mode fully implemented: class-based toggle, CSS variable auto-switching, 56 visual regression tests in Playwright.
- Loop-engineering workflow active with STATE.md, loop-run-log.md, loop-budget.md, loop-constraints.md.

## Active work

- No open design/UI issues. Consider: visual regression tests, performance audit, FAQ accordion fix (native `<details>` works but non-TailGrids), TailGrids version upgrades.
