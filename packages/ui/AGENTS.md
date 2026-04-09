# @pkstack/ui — AGENTS.md

## Purpose

Shared React UI primitives for pkstack apps, with agent-legible typed `*Variants` exports alongside each component.

## Public API

- **`@pkstack/ui`** — root export for shared UI components and helpers
- **`Button`** — base button primitive with typed `variant` and `size` props
- **`buttonVariants`** — typed variant contract agents can enumerate without reading implementation details
- **`cn(...)`** — Tailwind/classname merge helper

## Do Not Modify

- `buttonVariants` must remain a plain typed const export. Agents and lint rules rely on it being easy to inspect.
- `cn(...)` must stay framework-agnostic. Do not add DOM or browser-only behavior.
- This package owns components, not business logic. Do not add data fetching or app-specific state here.

## Common Agent Mistakes

1. **Exporting only the component and not the variants contract** — every shared component here must export a typed `*Variants` const.
2. **Moving app logic into a component package** — auth state, database reads, and feature logic belong in apps or other packages.
3. **Using path aliases inside the package** — published packages should use relative imports so the built output is portable.
