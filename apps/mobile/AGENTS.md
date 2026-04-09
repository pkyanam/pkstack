# apps/mobile — AGENTS.md

## Purpose

Reference Expo mobile app for the pkstack monorepo. It mirrors the mobile scaffold output while giving the repo a concrete workspace app to validate and evolve.

## Public API

- **`App.tsx`** — starter Expo screen showing shared contract usage
- **`app.json`** — Expo app metadata and prebuild configuration
- **`package.json`** — pinned mobile dependency set and Expo scripts
- **`tsconfig.json`** — strict TypeScript configuration for the mobile app

## Do Not Modify

- Keep this app framework-focused. Web-only packages like `@pkstack/ui` do not belong here.
- `app.json` owns the Expo app contract. Do not move those settings into ad hoc JS files without a reason.
- The template should consume shared packages for API and AI helpers, not duplicate contract definitions locally.

## Common Agent Mistakes

1. **Importing web-only packages into Expo** — `@pkstack/ui` is DOM-oriented and should not be pulled into the mobile template.
2. **Copying API schemas into the app** — shared contracts belong in `@pkstack/api`.
3. **Treating this app like the source-of-truth template** — make scaffold changes in `templates/mobile`, then mirror them here if the reference app also needs them.
