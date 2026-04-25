# pkstack

**TypeScript starter infrastructure for human + AI agent co-development.**

pkstack is a published starter kit and monorepo that gives you:

- `npm create pkstack` for a web app scaffold
- `npm create pkstack --mobile` for an Expo scaffold
- published `@pkstack/*` runtime packages shared across templates
- `@pkstack/config` for strict TypeScript, ESLint, and Tailwind defaults
- gstack-oriented `AGENTS.md` and `CLAUDE.md` conventions from day one

```bash
npm create pkstack my-app
npm create pkstack my-mobile-app --mobile
```

## Current state

pkstack is at `v0.2.3`.

- `create-pkstack`, `@pkstack/config`, and the Stage 2 `@pkstack/*` runtime packages are published on the same semver line.
- The web template, mobile template, CLI, reference apps, and package extraction work are done.
- The docs site is live through Mintlify at `pkstack.preetham.org`.
- Contributor validation includes **`npm run smoke`** (CI-parity without Playwright); see `CONTRIBUTING.md` and `CHANGELOG.md`.

## What pkstack gives you

### Web scaffold

- Next.js 15 App Router
- TypeScript 5 strict mode with `noUncheckedIndexedAccess`
- Tailwind v4
- Drizzle ORM
- Better Auth
- tRPC v11
- Vercel AI SDK helpers
- optional Stripe and Resend scaffold outputs
- generated `.env.example` and `.env.local`
- `AGENTS.md` and `CLAUDE.md` already present

### Mobile scaffold

- Expo
- TypeScript strict mode
- shared `@pkstack/api` contracts
- shared `@pkstack/ai` helpers

### Shared packages

- `@pkstack/ui`
- `@pkstack/db`
- `@pkstack/auth`
- `@pkstack/ai`
- `@pkstack/api`
- `@pkstack/config`

## How pkstack works end to end

There are four layers:

1. **Published packages**
   `packages/ui`, `db`, `auth`, `ai`, `api`, and `config` hold reusable runtime and tooling code.
2. **Source-of-truth templates**
   `templates/web` and `templates/mobile` are the canonical scaffold outputs.
3. **CLI**
   `packages/cli` copies a template, applies conditional choices, writes env files, and installs gstack.
4. **Generated app**
   The user gets a new app that consumes published `@pkstack/*` packages instead of copying core runtime code inline.

That means:

- package-owned code lives in `packages/*`
- app-owned wiring lives in the templates
- scaffold-time branching lives in `packages/cli/src/scaffold.ts`
- reference examples live in `apps/*`

## Repo layout

```text
pkstack/
├── packages/
│   ├── cli/          # create-pkstack binary
│   ├── config/       # shared tsconfig/eslint/tailwind + lint rules
│   ├── ui/           # shared React UI primitives
│   ├── db/           # Drizzle and Postgres helpers
│   ├── auth/         # Better Auth schema + helper wiring
│   ├── ai/           # AI SDK wrappers and helper utilities
│   └── api/          # plain TS/zod shared contracts
├── templates/
│   ├── web/          # source-of-truth Next.js scaffold
│   └── mobile/       # source-of-truth Expo scaffold
├── apps/
│   ├── mobile/       # in-repo Expo reference app
│   └── docs/         # Mintlify content for the docs site
└── .github/workflows/ # CI + npm publish flow
```

## For users of pkstack

### Create a web app

```bash
npm create pkstack my-app
cd my-app
npm install
docker compose up -d
$EDITOR .env.local
npm run db:migrate
npm run dev
```

### Create a mobile app

```bash
npm create pkstack my-mobile-app --mobile
cd my-mobile-app
npm install
npm run start
```

### What the generated web app looks like

```text
my-app/
├── src/
│   ├── app/                # Next.js routes
│   ├── db/                 # app schema + auth schema re-export + db wiring
│   ├── lib/                # auth/ai/email wiring
│   └── server/api/         # app-owned tRPC implementation
├── scripts/check-env.ts    # required env validation
├── docker-compose.yml
├── AGENTS.md
└── CLAUDE.md
```

The generated app is not a monorepo. It is a single app that depends on published pkstack packages.

## For contributors to pkstack

### Install and validate the repo

```bash
npm install
npm run build
npm run lint
npm run typecheck
npm test
npm run smoke
```

`npm run smoke` mirrors the important CI checks (CLI, runtime packages, web template `next build`, mobile template typecheck) without Playwright. Use `npm run test:e2e` or `npm run test:all` only when you explicitly want browser-based scaffold tests.

### Work on the CLI locally

```bash
npm run build -w packages/cli
PKSTACK_LOCAL_WORKSPACE=1 node packages/cli/dist/index.js test-app
PKSTACK_LOCAL_WORKSPACE=1 node packages/cli/dist/index.js test-mobile --mobile
```

`PKSTACK_LOCAL_WORKSPACE=1` is important when testing unpublished local package changes. It rewrites `@pkstack/*` dependencies in the generated app to local `file:` paths.

### Change scaffold output correctly

- edit `templates/web` or `templates/mobile` if the generated files should change
- edit `packages/cli/src/scaffold.ts` if behavior is conditional
- edit `packages/*` if shared runtime ownership changes
- rebuild the CLI
- scaffold a fresh app and verify it there

Do not treat `packages/cli/templates/*` as source of truth. Those are bundled copies produced by the CLI build.

## Agent workflow

pkstack is designed so AI coding tools can work with the project instead of fighting it.

- every package, template, and app has an `AGENTS.md`
- generated apps ship with `AGENTS.md` and `CLAUDE.md`
- shared UI components export typed `*Variants` contracts
- the repo keeps ownership boundaries explicit so agents know where code belongs

## Docs deployment plan

The docs content lives in [`apps/docs`](/Users/preetham/projects/pkstack/apps/docs).

Current status:

- local Mint preview works
- package publishing is done
- public docs deployment is live at `pkstack.preetham.org`

Target:

- host the docs through Mintlify
- use `pkstack.preetham.org` as the initial custom domain

## Read next

- [AGENTS.md](./AGENTS.md)
- [CLAUDE.md](./CLAUDE.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [CHANGELOG.md](./CHANGELOG.md)
- [prompts/feature-polish-handoff.md](./prompts/feature-polish-handoff.md) — active handoff for polish / QoL work
- [prompts/stage-2-handoff.md](./prompts/stage-2-handoff.md) — earlier docs / release-validation context (through v0.2.2)
