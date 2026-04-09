# @pkstack/api — AGENTS.md

## Purpose

Plain TypeScript API contracts for pkstack apps. This package owns shared router input/output schemas and contract types without framework-specific runtime code.

## Public API

- **`postSchema`** — canonical post entity schema
- **`getPostByIdInputSchema`** — input schema for loading one post
- **`createPostInputSchema`** — input schema for creating a post
- **`deletePostInputSchema`** — input schema for deleting a post
- **`PostRouterContract`** — plain TypeScript contract for the post router shape

## Do Not Modify

- Keep this package implementation-agnostic. No React, Next.js, Expo, or server runtime imports.
- Keep schemas transport-safe and reusable across web/mobile/docs.
- This package owns contracts only. Do not add database queries or tRPC setup here.

## Common Agent Mistakes

1. **Adding runtime router code here** — implementations belong in apps, not in this contract package.
2. **Importing framework types into shared contracts** — keep the package plain TypeScript.
3. **Duplicating zod schemas in apps** — update the shared contract here and consume it from apps.
