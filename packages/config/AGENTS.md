# @pkstack/config — AGENTS.md

## Purpose

Shared TypeScript, ESLint, and Tailwind configuration presets used by all pkstack packages, apps, and templates.

## Public API

- **`@pkstack/config/tsconfig/base`** — base tsconfig with strict mode and `noUncheckedIndexedAccess`
- **`@pkstack/config/tsconfig/nextjs`** — extends base, adds Next.js plugin and bundler module resolution
- **`@pkstack/config/tsconfig/node`** — extends base, NodeNext module resolution, outputs to `dist/`
- **`@pkstack/config/eslint`** — recommended TypeScript ESLint config with pkstack rules
- **`pkstack/require-variants`** — ESLint rule exported via `@pkstack/config/eslint` for component `*Variants` exports
- **`@pkstack/config/tailwind`** — Tailwind v4 preset with pkstack design tokens (CSS variables)

## Do Not Modify

- The CSS variable names in `tailwind.preset.js` (e.g., `--background`, `--primary`) are used by all shadcn/ui components in the web template. Renaming them breaks the UI.
- `noUncheckedIndexedAccess: true` in `base.json` — this is intentional. Do not downgrade.
- `exactOptionalPropertyTypes: true` in `base.json` — intentional. Do not remove.

## Common Agent Mistakes

1. **Adding app-specific config here** — this package must stay framework-agnostic. Anything Next.js-specific belongs in `templates/web/`, not here.
2. **Changing module resolution in `base.json`** — the base uses `NodeNext`, the Next.js preset uses `Bundler`. They're different on purpose. Don't unify them.
3. **Implementing lint rules in apps instead of here** — shared lint conventions like `require-variants` belong in this package so every app/template consumes one rule source.
