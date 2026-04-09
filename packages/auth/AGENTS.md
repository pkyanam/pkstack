# @pkstack/auth — AGENTS.md

## Purpose

Shared Better Auth wiring for pkstack apps. This package owns the auth schema contract and helpers for creating auth instances and route handlers.

## Public API

- **`createAuth({ db, ...options })`** — create a Better Auth instance backed by Drizzle
- **`getSession(auth, headers)`** — resolve the current session from request headers
- **`authMiddleware(auth)`** — create Next.js auth route handlers from an auth instance
- **`createAuthRouteHandlers(auth)`** — alias for `authMiddleware`
- **`authSchema`** — Better Auth Drizzle schema module

## Do Not Modify

- `authSchema` is the ownership boundary for auth tables. Do not move it into `@pkstack/db`.
- This package must not create the database client. Apps pass `db` in explicitly.
- Keep exports framework-light. Avoid adding UI or app-specific behavior here.

## Common Agent Mistakes

1. **Importing the app db client into this package** — that reverses the package boundary and creates cycles.
2. **Adding business logic to `createAuth`** — this package only wires Better Auth, not app roles or profile logic.
3. **Editing the auth schema in app code** — update the package export instead so every app consumes one contract.
