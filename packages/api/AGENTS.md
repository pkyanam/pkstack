# @pkstack/api — AGENTS.md

## Purpose

`@pkstack/api` owns shared plain TypeScript and zod contracts.

Its job is to let web and mobile code share inputs, outputs, and entity shapes without dragging in framework runtime code.

## Public API

- **`postSchema`** — canonical post entity contract
- **`getPostByIdInputSchema`** — input contract for one post
- **`createPostInputSchema`** — input contract for creation
- **`deletePostInputSchema`** — input contract for deletion
- **`PostRouterContract`** — plain contract for router shape

## Do Not Modify

- Keep this package framework-agnostic.
- Keep it contract-only.
- Do not add tRPC implementation code, React imports, or server runtime logic here.

## Common Agent Mistakes

1. **Putting implementation logic into a contract package** — routers and handlers live in apps.
2. **Importing Next.js, Expo, or React types here** — shared contracts must stay portable.
3. **Duplicating schemas in app code instead of updating the shared package** — change the contract once here.
