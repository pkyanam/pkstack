# templates/mobile — AGENTS.md

## Purpose

Source-of-truth Expo mobile template for `npm create pkstack --mobile`. This scaffold stays minimal and consumes shared pkstack packages instead of copying API and AI helpers into the app.

## Public API

- **`App.tsx`** — starter Expo screen showing shared contract usage
- **`app.json`** — Expo app metadata and prebuild configuration
- **`package.json`** — pinned mobile dependency set and Expo scripts
- **`tsconfig.json`** — strict TypeScript configuration for the mobile template

## Do Not Modify

- Keep this template framework-focused. Web-only packages like `@pkstack/ui` do not belong here.
- `app.json` owns the Expo app contract. Do not move those settings into ad hoc JS files without a reason.
- The template should consume shared packages for API and AI helpers, not duplicate contract definitions locally.

## Common Agent Mistakes

1. **Importing web-only packages into Expo** — `@pkstack/ui` is DOM-oriented and should not be pulled into the mobile template.
2. **Copying API schemas into the app** — shared contracts belong in `@pkstack/api`.
3. **Treating this template like the published mobile app** — `templates/mobile` is scaffold output, while `apps/mobile` is the in-repo reference app.
