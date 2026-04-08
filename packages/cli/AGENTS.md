# packages/cli — AGENTS.md

## Purpose

The `create-pkstack` npm binary. Prompts for project configuration, copies `templates/web` with user choices applied, generates env files, and installs gstack.

## Public API

- **`npm create pkstack [project-name]`** — interactive scaffold flow
- **`npx create-pkstack setup-gstack`** — install gstack into the current directory
- **`scaffold(opts)`** — (internal) copies template files with filters applied
- **`installGstack(projectDir)`** — (internal) downloads or symlinks gstack
- **`generateEnvFiles(opts)`** — (internal) writes `.env.example` and `.env.local`

## Do Not Modify

- `src/constants.ts` — `GSTACK_VERSION` is pinned; change only via a dedicated PR
- `src/scaffold.ts` cleanup logic — the `try/catch` that calls `rmSync` on partial failure is critical; do not remove it
- The prompt order (name → database → tRPC → payments → email) is intentional UX — do not reorder without discussion

## Common Agent Mistakes

1. **Adding conditional file content to `templates/web/` instead of scaffold.ts** — conditional features (Stripe, Resend, Turso) are stripped/patched by `scaffold.ts`. The template itself should be the "everything on" version; the CLI removes what wasn't selected.
2. **Using `require()` instead of `import`** — the CLI is ESM (`"type": "module"` in package.json). Use `import`, not `require`.
3. **Not running `npm run build` before testing** — the CLI uses compiled JS from `dist/`. Source changes are not picked up until you rebuild.
