# pkstack — AGENTS.md

## Purpose

pkstack is a TypeScript monorepo starter kit designed for human + AI agent co-development. It ships `npm create pkstack` (the CLI), `@pkstack/config` (shared toolchain presets), and a `templates/web` source-of-truth template — all pre-wired with gstack for AI agent workflows.

## Repo Structure

```
pkstack/
├── packages/
│   ├── cli/          # create-pkstack binary — see packages/cli/AGENTS.md
│   └── config/       # @pkstack/config shared presets — see packages/config/AGENTS.md
├── templates/
│   └── web/          # Next.js 15 template — see templates/web/AGENTS.md
├── apps/
│   └── ...           # reserved for later-stage reference apps and docs
├── scripts/
│   └── setup-gstack.sh   # contributor setup helper for installing gstack
└── .github/
    └── workflows/    # CI/CD pipelines
```

## Public API

- **`npm create pkstack`** — scaffolds a new AI-native Next.js app
- **`npx create-pkstack setup-gstack`** — installs gstack into an existing pkstack project
- **`@pkstack/config`** — shared tsconfig presets, eslint config, tailwind preset

## Do Not Modify

- `templates/web/` is the source of truth for scaffold output. All template changes must be validated with `tsc --noEmit` and `next build` before merging.
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
