# @pkstack/auth — AGENTS.md

## Purpose

`@pkstack/auth` owns the shared Better Auth contract for pkstack apps.

It exists to keep auth schema and auth helper wiring consistent across scaffolded apps without taking over the app’s database instance or feature logic.

## Public API

- **`authSchema`** — Better Auth Drizzle schema contract
- **`createAuth({ db, ...options })`** — build a Better Auth instance
- **`getSession(auth, headers)`** — session helper
- **`authMiddleware(auth)`** — route-handler helper
- **`createAuthRouteHandlers(auth)`** — alias for route-handler creation

## Do Not Modify

- `authSchema` ownership stays here.
- This package must not own the db client.
- Keep exports focused on shared auth wiring, not app-specific policies or UI.

## Common Agent Mistakes

1. **Importing app db code into this package** — apps pass in `db`; this package should not reach back into app code.
2. **Moving auth tables into `@pkstack/db`** — that breaks the intended boundary.
3. **Putting profile, role, or business logic into auth helpers** — keep those concerns app-owned.
