# @pkstack/ui — AGENTS.md

## Purpose

`@pkstack/ui` owns shared React presentation primitives for the web stack.

It exists so scaffolded web apps can reuse UI building blocks without copying them into every app.

## Public API

- **`@pkstack/ui`** — root package export
- **`Button`** — shared button primitive
- **`buttonVariants`** — typed variants contract
- **`cn(...)`** — shared class merge helper

## Do Not Modify

- Shared components here must export a typed `*Variants` contract alongside the component.
- This package owns UI primitives only, not app business logic.
- Keep imports portable and package-safe.

## Common Agent Mistakes

1. **Adding feature logic to UI components** — auth, billing, app data, and business state do not belong here.
2. **Exporting only the component and hiding the variants contract** — the typed variants are part of pkstack’s agent-readable design.
3. **Using this package from Expo/mobile code** — `@pkstack/ui` is for the web stack.
