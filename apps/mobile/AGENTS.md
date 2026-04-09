# apps/mobile — AGENTS.md

## Purpose

Reference Expo app inside the pkstack monorepo.

This app exists to mirror and validate the mobile scaffold while giving the repo a concrete mobile workspace app to test against.

## Public API

- **`App.tsx`** — reference mobile starter screen
- **`app.json`** — Expo app metadata
- **`package.json`** — mobile dependency set and scripts
- **`tsconfig.json`** — strict TypeScript config

## Do Not Modify

- Treat this app as a reference, not the scaffold source of truth.
- Keep shared contracts and helpers in packages.
- Keep web-only runtime code out of this app.

## Common Agent Mistakes

1. **Changing only this app when the scaffold should change** — update `templates/mobile` first.
2. **Pulling `@pkstack/ui` into Expo** — this is not a web app.
3. **Duplicating contracts locally** — consume `@pkstack/api` instead.
