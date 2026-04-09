# pkstack — AGENTS.md

## Purpose

pkstack is a TypeScript monorepo starter kit designed for human + AI agent co-development. It ships `npm create pkstack` (the CLI), `@pkstack/config` (shared toolchain presets), and a `templates/web` source-of-truth template — all pre-wired with gstack for AI agent workflows.

## Repo Structure

```
pkstack/
├── packages/
│   ├── cli/          # create-pkstack binary — see packages/cli/AGENTS.md
│   ├── config/       # @pkstack/config shared presets — see packages/config/AGENTS.md
│   ├── ui/           # shared React UI primitives
│   ├── db/           # Drizzle client + migration helpers
│   ├── auth/         # Better Auth wiring + auth schema
│   ├── ai/           # AI SDK wrappers + agent helpers
│   └── api/          # plain TypeScript API contracts
├── templates/
│   ├── web/          # Next.js 15 template — see templates/web/AGENTS.md
│   └── mobile/       # Expo template for `--mobile`
├── apps/
│   ├── mobile/       # reference Expo app
│   └── docs/         # Mintlify-format docs site
├── scripts/
│   └── setup-gstack.sh   # contributor setup helper for installing gstack
└── .github/
    └── workflows/    # CI/CD pipelines
```

## Public API

- **`npm create pkstack`** — scaffolds a new AI-native Next.js app
- **`npm create pkstack --mobile`** — scaffolds the Expo mobile template
- **`npx create-pkstack setup-gstack`** — installs gstack into an existing pkstack project
- **`@pkstack/*`** — shared runtime and contract packages consumed by templates/apps
- **`@pkstack/config`** — shared tsconfig presets, eslint config, tailwind preset

## Do Not Modify

- `templates/web/` and `templates/mobile/` are the source of truth for scaffold output. Template changes must be validated against real generated apps before merging.
- `packages/cli/src/constants.ts` — `GSTACK_VERSION` pin requires a dedicated PR with release notes.
- The AGENTS.md H2 headings (`## Purpose`, `## Public API`, `## Do Not Modify`, `## Common Agent Mistakes`) are a required schema across all packages. Do not remove or rename them.

## Common Agent Mistakes

1. **Editing `templates/web` directly instead of updating the CLI template logic** — the CLI in `packages/cli/src/scaffold.ts` copies and transforms `templates/web`. If a template feature is conditional (e.g., Stripe), it must be handled in scaffold.ts, not baked into the template.
2. **Installing packages in the root workspace instead of the correct package** — each package manages its own `package.json`. Run `npm install <pkg> -w packages/cli` (not root) to add dependencies to the CLI.
3. **Forgetting to update `.env.example` when adding a new env var** — the CLI generates `.env.example` from `packages/cli/src/env.ts`. Update that file, not the template's `.env.example` directly (which is the generated output reference).

## Skill Routing (gstack)

| Task | Skill |
|------|-------|
| Review a PR before merging | `/review` |
| Ship a release | `/ship` |
| Investigate a bug | `/investigate` |
| QA the scaffold output | `/qa` |
| Design system decisions | `/design-consultation` |
| Architecture changes | `/plan-eng-review` |
