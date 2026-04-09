# @pkstack/config — AGENTS.md

## Purpose

`@pkstack/config` keeps the repo and generated apps opinionated in one place.

It owns the shared defaults that every package, template, and app depends on:

- strict TypeScript
- ESLint configuration
- Tailwind preset values
- the `require-variants` lint rule

## Public API

- **`@pkstack/config/tsconfig/base`** — strict TypeScript baseline
- **`@pkstack/config/tsconfig/nextjs`** — Next.js-specific tsconfig preset
- **`@pkstack/config/tsconfig/node`** — Node/package tsconfig preset
- **`@pkstack/config/eslint`** — shared ESLint config
- **`pkstack/require-variants`** — shared component export rule
- **`@pkstack/config/tailwind`** — shared Tailwind preset

## Do Not Modify

- Keep this package framework-light and reusable.
- Strict compiler options such as `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` are intentional.
- Shared lint rules belong here, not duplicated inside templates or apps.

## Common Agent Mistakes

1. **Putting app-specific conventions here** — this package should serve multiple packages, templates, and apps.
2. **Weakening strict compiler flags to quiet errors** — fix the code instead.
3. **Re-implementing the shared lint rule elsewhere** — `require-variants` has one home.
