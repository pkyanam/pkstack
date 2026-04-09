# templates/mobile — AGENTS.md

## Purpose

Source-of-truth Expo scaffold for pkstack.

This template is intentionally small. It shows how mobile apps should consume shared contracts and AI helpers without pulling in web-only runtime concerns.

## Public API

- **`App.tsx`** — starter Expo screen
- **`app.json`** — Expo app metadata
- **`package.json`** — pinned mobile dependency set
- **`tsconfig.json`** — strict TypeScript config

## Do Not Modify

- Keep the mobile template mobile-specific.
- Do not pull `@pkstack/ui` into Expo.
- Keep shared contracts in packages instead of copying them into the app.

## Common Agent Mistakes

1. **Treating this like the web scaffold** — mobile owns a smaller surface area.
2. **Importing DOM/web-only runtime code** — mobile should use `@pkstack/api` and `@pkstack/ai`, not web UI packages.
3. **Using `apps/mobile` as the template source** — this directory is the source of truth.
