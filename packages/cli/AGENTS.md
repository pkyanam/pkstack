# packages/cli — AGENTS.md

## Purpose

`create-pkstack` is the public entry point into the whole system.

It turns:

- source-of-truth templates
- shared published packages
- scaffold choices

into a real generated app on disk.

## Public API

- **`npm create pkstack [project-name]`** — scaffold the web app
- **`npm create pkstack [project-name] --mobile`** — scaffold the Expo app
- **`npx create-pkstack setup-gstack`** — install gstack into the current project
- **`scaffold(opts)`** — internal template-copy and transform flow
- **`generateEnvFiles(opts)`** — internal `.env.example` and `.env.local` generation
- **`installGstack(projectDir)`** — internal gstack installer

## Do Not Modify

- `src/constants.ts` `GSTACK_VERSION` pin should only change in a dedicated PR.
- `src/scaffold.ts` owns conditional scaffold behavior. Do not move that logic into the templates.
- `templates/*` inside this package are bundled artifacts copied from the source templates. Do not treat them as authoring sources.

## Common Agent Mistakes

1. **Editing bundled templates here instead of `templates/*`** — rebuild the CLI after changing the source templates.
2. **Baking optional feature logic into template files** — Stripe, Resend, mobile selection, and similar choices belong in `scaffold.ts`.
3. **Testing the CLI without rebuilding it** — the published/built behavior comes from `dist/`, not raw source files.
