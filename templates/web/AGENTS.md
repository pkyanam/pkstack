# templates/web — AGENTS.md

## Purpose

Source-of-truth Next.js web scaffold for pkstack.

This template owns app structure and app-specific wiring for the generated web app.

It consumes published pkstack packages instead of embedding shared runtime code inline.

## Public API

- **`src/db/schema.ts`** — app-owned Drizzle tables
- **`src/db/auth-schema.ts`** — re-export of the shared auth schema contract
- **`src/db/index.ts`** — app db wiring using `@pkstack/db`
- **`src/lib/auth.ts`** — app auth wiring using `@pkstack/auth`
- **`src/lib/ai.ts`** — app AI entry point built on `@pkstack/ai`
- **`src/server/api/*`** — app-owned tRPC implementation
- **`src/app/*`** — Next.js routes and UI composition
- **`scripts/check-env.ts`** — env validation before dev/build

## Do Not Modify

- Keep shared runtime concerns in packages, not reimplemented locally.
- Keep `src/db/auth-schema.ts` as a thin shared-schema re-export.
- Keep `scripts/check-env.ts` behavior compatible with the npm `dev` and `build` scripts.

## Common Agent Mistakes

1. **Moving package-owned runtime code back into the app** — use `@pkstack/*`.
2. **Changing scaffold structure only in bundled CLI copies** — edit this source template instead.
3. **Forgetting the app/package split** — app schema and feature logic stay here; reusable runtime stays in packages.
