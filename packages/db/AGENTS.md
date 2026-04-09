# @pkstack/db — AGENTS.md

## Purpose

Shared Drizzle and Postgres helpers for pkstack apps. This package owns database client creation, schema merging, and migration config helpers.

## Public API

- **`createDb(schema, connectionString?)`** — create a Drizzle client from merged app/auth schemas
- **`createPostgresClient(connectionString?)`** — create the underlying `postgres` client with pkstack defaults
- **`mergeSchemas(...schemas)`** — combine app-owned and package-owned schema modules into one Drizzle schema object
- **`getDatabaseUrl(connectionString?)`** — resolve and validate the database URL
- **`createDrizzleConfig({ schema, out? })`** — generate a Drizzle config object for app migration files

## Do Not Modify

- This package must not define the auth schema. That contract belongs to `@pkstack/auth`.
- Keep `prepare: false` in the Postgres client default. This is required for Neon transaction pool compatibility.
- Migration helpers must stay plain TypeScript utilities, not app-specific wrappers.

## Common Agent Mistakes

1. **Moving auth table definitions into this package** — auth schema ownership stays in `@pkstack/auth`.
2. **Hard-coding app schema paths** — apps own their schema files; this package should accept them as inputs.
3. **Baking framework concerns into db helpers** — no Next.js, React, or Expo imports belong here.
