# pkstack — AGENTS.md

## Purpose

pkstack is a TypeScript monorepo for a published starter kit built around human + AI agent co-development.

The repo owns four things:

1. published runtime/tooling packages in `packages/*`
2. source-of-truth scaffold templates in `templates/*`
3. the `create-pkstack` CLI in `packages/cli`
4. reference apps/docs in `apps/*`

The current product state is:

- packages and CLI are published on npm on the **v0.2.x** line (verify the registry for the latest tag)
- source templates and `create-pkstack` in this repo track the same semver in `package.json` files
- public docs are live at **pkstack.preetham.org** (Mintlify)
- default validation: `npm test` (Turbo unit tests) plus **`npm run smoke`** for CI-parity without Playwright; GitHub Actions does not run Playwright today

## Public API

- **`npm create pkstack [project-name]`** — scaffold the web app
- **`npm create pkstack [project-name] --mobile`** — scaffold the Expo app
- **`npx create-pkstack setup-gstack`** — install gstack into an existing project
- **`@pkstack/ui`** — shared React UI primitives
- **`@pkstack/db`** — shared Drizzle and Postgres helpers
- **`@pkstack/auth`** — shared Better Auth schema and helper wiring
- **`@pkstack/ai`** — shared AI SDK wrappers and helper utilities
- **`@pkstack/api`** — shared plain TypeScript/zod contracts
- **`@pkstack/config`** — shared tsconfig, ESLint, Tailwind, and lint rules

## Do Not Modify

- `templates/web/` and `templates/mobile/` are the source of truth for scaffold output.
- `packages/cli/templates/*` are bundled copies, not authoring sources.
- `packages/cli/src/constants.ts` `GSTACK_VERSION` pin should only change in a dedicated PR.
- The AGENTS.md H2 headings `## Purpose`, `## Public API`, `## Do Not Modify`, and `## Common Agent Mistakes` are required across the repo.

## Common Agent Mistakes

1. **Changing the bundled CLI templates instead of the source templates** — edit `templates/*`, then rebuild the CLI so `packages/cli/templates/*` updates.
2. **Putting conditional scaffold logic into the templates** — optional features belong in `packages/cli/src/scaffold.ts`, not as dead branches in scaffold output.
3. **Moving app-owned code into shared packages** — package boundaries are strict. UI belongs in `@pkstack/ui`, auth schema belongs in `@pkstack/auth`, db helpers belong in `@pkstack/db`, and app feature logic stays in the scaffolded app.
4. **Validating only inside the monorepo** — the real check is a fresh generated app created from the built CLI.

## Repo Structure

```text
pkstack/
├── packages/
│   ├── cli/              # create-pkstack binary
│   ├── config/           # shared config and lint rules
│   ├── ui/               # shared UI primitives
│   ├── db/               # shared Drizzle helpers
│   ├── auth/             # shared Better Auth contract/helpers
│   ├── ai/               # shared AI helpers
│   └── api/              # shared contracts
├── templates/
│   ├── web/              # source-of-truth web scaffold
│   └── mobile/           # source-of-truth mobile scaffold
├── apps/
│   ├── mobile/           # reference Expo app
│   └── docs/             # Mintlify docs content
└── .github/workflows/    # CI, verification, and npm publish
```

## Working Model

When a user runs `npm create pkstack my-app`, the flow is:

1. `create-pkstack` selects a template
2. the CLI copies template files into a new directory
3. scaffold choices remove or keep optional files
4. web scaffolds get generated env files
5. the generated app depends on published `@pkstack/*` packages
6. the generated app starts with agent-facing docs already present

Use this model when deciding where changes belong.
