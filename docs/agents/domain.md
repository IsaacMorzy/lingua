# Domain Docs

> How domain knowledge is organized for the `lingua` repository.

## Layout

Single-context layout:

- `CONTEXT.md` at repo root — glossary, current decisions, and active work
- `docs/adr/` — architecture decision records

## Consumer rules

- Read `CONTEXT.md` before making architectural decisions.
- Read relevant ADRs before changing code in that area.
- Update `CONTEXT.md` when domain language changes or new decisions are made.
- Write a new ADR for any decision that is hard to reverse.

## Key domains

- **Frappe app** — Python backend, DocTypes (`Lingua Language`, `Lingua Level System`)
- **Astro frontend** — public website under `frontend/`, built to `lingua/www/` and `lingua/public/frontend/`
- **Design system** — documented in `DESIGN.md`
