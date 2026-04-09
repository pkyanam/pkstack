# @pkstack/db — AGENTS.md

## Purpose

`@pkstack/db` owns shared Drizzle and Postgres helpers used by scaffolded apps.

It provides the common wiring for database access while leaving app schema ownership in the app and auth schema ownership in `@pkstack/auth`.

## Public API

- **`createDb(schema, connectionString?)`** — build the Drizzle instance
- **`createPostgresClient(connectionString?)`** — create the underlying Postgres client
- **`mergeSchemas(...schemas)`** — combine app schema and auth schema
- **`getDatabaseUrl(connectionString?)`** — validate and resolve the database URL
- **`createDrizzleConfig(...)`** — generate Drizzle config helpers

## Do Not Modify

- Do not move the auth schema into this package.
- Keep database helpers framework-agnostic.
- Keep the Neon-safe Postgres defaults intact unless there is a deliberate compatibility change.

## Common Agent Mistakes

1. **Owning table definitions here that belong elsewhere** — app schema stays app-owned; auth schema stays in `@pkstack/auth`.
2. **Hard-coding app paths into helpers** — accept app schema as input instead.
3. **Adding Next.js or React concerns to db utilities** — this package must stay plain runtime infrastructure.
