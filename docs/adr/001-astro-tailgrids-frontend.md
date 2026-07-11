# ADR 001: Astro 7 + TailGrids Frontend

## Status

Accepted

## Context

The `lingua` Frappe app needs a public marketing website for IJLAPS. We evaluated static site generators and UI component libraries.

## Decision

Use Astro 7 with Tailwind CSS v4 and TailGrids UI CLI components.

## Consequences

- Astro outputs static HTML to `lingua/www/`, which Frappe serves naturally.
- Tailwind v4 uses a CSS-first configuration via `@tailwindcss/vite`.
- TailGrids provides React-based UI primitives; Astro renders them statically by default.
- React is added to Astro via `@astrojs/react` only for TailGrids components.

## Alternatives considered

- shadcn/ui — replaced by TailGrids per user direction.
- Pure Astro components — would require rebuilding every UI primitive from scratch.
