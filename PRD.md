# pkstack — Product Requirements Document

**Author:** Preetham Kyanam  
**Status:** ACTIVE  
**Last updated:** 2026-04-08  
**Design doc:** `~/.gstack/projects/pkstack/preetham-unknown-design-20260408-164154.md`  
**Eng review:** `~/.gstack/projects/pkstack/preetham-unknown-eng-review-test-plan-20260408-170446.md`

---

## Vision

pkstack is the first TypeScript starter kit designed from first principles for
**human + AI agent codevelopment**. Not "AI features in your app" — AI agents
*working on* your app, from day one.

Every scaffolded project ships with a full AI agent workflow toolchain (gstack)
pre-configured: `/review`, `/ship`, `/qa`, `/browse`, `/office-hours`. Every
convention, file structure, package boundary, and doc is written for the model
as much as the person.

**One-sentence pitch:** T3 Stack was 2022 thinking. pkstack is the 2026 stack.

---

## Problem

Existing TypeScript starter kits (T3, ShipFast, Makerkit, RevKit) were designed
for human developers. Even when they add `AGENTS.md` or Cursor rules as
afterthoughts, the underlying architecture was never conceived with an AI agent
as a first-class collaborator:

- `AGENTS.md` is a sprinkle on a human-designed codebase
- No workflow toolchain pre-configured for agents
- No conventions for what agents should and should not modify
- Templates assume the developer reads the code; agents need explicit contracts

The result: AI agents drift, hallucinate APIs, and require constant correction
when working on these codebases.

---

## Target Users

**Primary:** Solo founders and indie hackers building AI-native SaaS products.
Specifically: people who do 50%+ of their coding via AI agents (Claude Code,
Cursor, Codex, Windsurf).

**Secondary:** Small teams (2-5 engineers) who want shared conventions for
human+agent collaboration without a custom framework.

**Distribution channels:** Theo's community (t3.gg), Mintlify community,
Convex community, X/Twitter TypeScript builders.

---

## Core Differentiator

```
Every other starter kit:    pkstack:
─────────────────────────   ──────────────────────────────────────
Human-first codebase        Human+agent co-designed codebase
AGENTS.md as afterthought   AGENTS.md as required schema
No workflow toolchain       gstack pre-wired (12+ skills)
Agent drifts on changes     Agent reads AGENTS.md, doesn't drift
You configure AI tools      AI tools already configured
```

The CLI that ships with a full AI agent workflow IS the product. Everything
else is scaffolding.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | RSC, edge, ecosystem |
| Language | TypeScript 5 strict + `noUncheckedIndexedAccess` | End-to-end safety |
| Styling | Tailwind v4 + shadcn/ui | Fast UI, no lock-in |
| ORM | Drizzle | Typesafe, SQL-native, agent-legible |
| Database (local) | Docker Compose (Postgres) | `npm run dev` works on day one, no cloud account |
| Database (prod) | Neon (default) | Indie-friendly pricing |
| Auth | Better Auth | Self-hosted, flexible |
| API | tRPC v11 (App Router pattern) | Typesafe server/client |
| AI | Vercel AI SDK | Provider-agnostic (Claude, OpenAI, etc.) |
| Payments | Stripe | Standard |
| Email | Resend | Best DX |
| Mobile | Expo (v0.2) | React Native, shared types |
| Monorepo | Turborepo | Caching, task pipeline |
| Deploy | Vercel (web) + EAS (mobile, v0.2) | Zero config |
| Agent Workflow | gstack (MIT, pinned) | 12+ AI agent skills |
| Runtime | npm-first (bun internally where safe) | Max compatibility |

---

## Agent-First Conventions

Every project and package ships with:

### AGENTS.md (required H2 headings, additional permitted)
```markdown
## Purpose
One sentence. What does this package/app do?

## Public API
Every exported function/component, one-line description each.

## Do Not Modify
Stable contracts that must not change without a major version bump.

## Common Agent Mistakes
Top 3 mistakes agents make here and how to avoid them.
```

### CLAUDE.md
Claude Code-specific instructions: which skills to use, which tools to avoid,
project-specific conventions.

### Component variants (agent-optimized)
Every UI component exports a typed `variants` const so agents enumerate options
without reading source:

```typescript
// src/components/button.tsx
export const buttonVariants = {
  size: ['sm', 'md', 'lg'] as const,
  intent: ['primary', 'secondary', 'ghost'] as const,
} satisfies Record<string, readonly string[]>
```

---

## Development Stages

### Stage 0 — Foundation (current)
- [x] Design doc (office-hours session)
- [x] Eng review (plan-eng-review session)
- [x] GitHub repo created
- [ ] PRD approved

### Stage 1 — v0.1: `npm create pkstack` works
*Goal: a developer can run one command and get a working AI-native Next.js app
with gstack pre-wired.*

### Stage 2 — v0.2: `@pkstack/*` packages published
*Goal: the conventions extracted as installable packages; mobile support; docs site.*

### Stage 3 — v0.3: ecosystem
*Goal: community templates, plugin system, design consultation.*

---

## Stage 1: v0.1 Specification

### Deliverables
1. `packages/cli/` — `create-pkstack` binary, published to npm
2. `packages/config/` — `@pkstack/config` shared tsconfig/eslint/tailwind presets
3. `templates/web/` — Next.js 15 template (the source of truth for scaffold output)
4. Root `AGENTS.md` and `CLAUDE.md`
5. `TODOS.md`
6. `CONTRIBUTING.md`
7. `scripts/setup-gstack.sh` for contributors
8. GitHub Actions CI pipeline

### Repo Structure (v0.1)

```
pkstack/
├── packages/
│   ├── cli/                   # create-pkstack binary
│   │   ├── src/
│   │   │   ├── index.ts       # entry point, prompts
│   │   │   ├── scaffold.ts    # file generation, cleanup on failure
│   │   │   ├── gstack.ts      # tarball download + setup
│   │   │   ├── env.ts         # .env.local + .env.example generation
│   │   │   └── constants.ts   # GSTACK_VERSION, TEMPLATE_VERSION
│   │   ├── AGENTS.md
│   │   └── package.json       # bin: { "create-pkstack": "./dist/index.js" }
│   └── config/
│       ├── tsconfig/
│       │   ├── base.json
│       │   ├── nextjs.json
│       │   └── node.json
│       ├── eslint.config.js
│       ├── tailwind.preset.js
│       ├── AGENTS.md
│       └── package.json
├── templates/
│   └── web/                   # source of truth for npm create pkstack output
│       ├── src/
│       │   ├── app/           # Next.js App Router
│       │   ├── components/    # shadcn/ui components + variants exports
│       │   ├── db/
│       │   │   ├── schema.ts       # app Drizzle schema
│       │   │   └── auth-schema.ts  # pre-generated by auth@latest generate
│       │   ├── server/
│       │   │   └── api/
│       │   │       ├── trpc.ts         # tRPC init + React.cache() context
│       │   │       ├── query-client.ts # server/client QueryClient factory
│       │   │       ├── provider.tsx    # QueryClient provider (client component)
│       │   │       └── server.ts       # RSC caller (createCallerFactory)
│       │   └── lib/
│       │       ├── auth.ts    # Better Auth instance (uses db client)
│       │       └── email.ts   # Resend helper (optional scaffold output)
│       ├── scripts/
│       │   └── check-env.ts   # pre-dev env validation, clear error per missing var
│       ├── docker-compose.yml  # Postgres for local dev (no cloud account needed)
│       ├── drizzle.config.ts  # imports both schema.ts and auth-schema.ts
│       ├── AGENTS.md          # purpose, public API, do not modify, common mistakes
│       ├── CLAUDE.md          # gstack section pre-configured
│       └── package.json
├── apps/                      # reserved for v0.2+ reference apps and docs
├── AGENTS.md                  # root-level: monorepo purpose + contribution guide
├── CLAUDE.md                  # gstack section + skill routing rules
├── TODOS.md
├── CONTRIBUTING.md
├── scripts/
│   └── setup-gstack.sh        # contributors run this after clone
└── .claude/
    └── skills/gstack/         # gitignored
```

Scaffold-time generation:
- `.env.example` and `.env.local` are generated by `packages/cli/src/env.ts`
- optional Stripe route: `src/app/api/webhooks/stripe/route.ts`

### CLI Prompt Flow

```
┌─────────────────────────────────────────────────────────┐
│  npm create pkstack                                      │
└─────────────────────────────────────────────────────────┘

? What is your project name?
  › my-app

? Include tRPC?
  ● Yes [default]
  ○ No (plain Next.js API routes)

? Include payments (Stripe)?
  ● Yes [default]
  ○ No

? Include email (Resend)?
  ● Yes [default]
  ○ No

[Scaffolding files...]
[Installing gstack from github.com/garrytan/gstack@v0.16.1.0...]

✓ my-app created successfully!

  Next steps:
    cd my-app
    # .env.local is generated by the CLI
    $EDITOR .env.local
    docker compose up -d          # start local Postgres (or use Neon free tier)
    npm install
    npm run dev
```

**On gstack install failure:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  ⚠  gstack installation failed (network error)                      │
│                                                                      │
│  Your project was scaffolded successfully, but the AI agent         │
│  workflow toolchain (gstack) could not be installed.                 │
│                                                                      │
│  To install later:  npx create-pkstack setup-gstack                 │
│  Or manually:       https://github.com/garrytan/gstack              │
└─────────────────────────────────────────────────────────────────────┘
```

### gstack Integration

- **Install method:** GitHub tarball download (Node.js `fetch` + `tar` extraction)
- **Version pinned:** `GSTACK_VERSION` constant in `packages/cli/src/constants.ts`
- **Release URL:** `https://github.com/garrytan/gstack/archive/refs/tags/v{GSTACK_VERSION}.tar.gz`
- **If global exists:** symlink `{project}/.claude/skills/gstack` → `~/.claude/skills/gstack`
- **On failure:** loud warning box (not silent), `npx create-pkstack setup-gstack` fallback
- **Version bump process:** PR to update `GSTACK_VERSION` when gstack cuts a release

### Auth + Database Architecture

```
templates/web/
├── src/db/
│   ├── schema.ts          # app tables (users, posts, etc.)
│   └── auth-schema.ts     # generated by `npx auth@latest generate`
│                          # DO NOT EDIT — regenerate from Better Auth CLI
├── src/lib/
│   └── auth.ts            # Better Auth instance
│                          # import { db } from '../db'
│                          # betterAuth({ database: drizzleAdapter(db) })
└── drizzle.config.ts      # imports both schema.ts AND auth-schema.ts
                           # one migration runner (drizzle-kit)
```

**Migration workflow:**
```bash
# First time or when auth schema changes:
npx auth@latest generate       # regenerates src/db/auth-schema.ts
npx drizzle-kit generate       # generates migration from both schemas
npx drizzle-kit migrate        # applies to database
```

### tRPC v11 + Next.js 15 RSC Architecture

```
src/server/api/
├── trpc.ts          # createTRPCRouter, publicProcedure, protectedProcedure
│                    # context: React.cache(() => ({ db, session }))
├── query-client.ts  # makeQueryClient(): server (new per request) vs
│                    #                   browser (singleton with staleTime)
│                    # shouldDehydrateQuery: include pending queries
├── provider.tsx     # <TRPCProvider> client component, wraps layout
└── server.ts        # createCallerFactory for RSC server-side calls
                     # no HTTP round-trip from Server Components
```

Reference: [tRPC App Router Setup](https://trpc.io/docs/client/nextjs/app-router-setup)

### Local Development (day-one experience)

```yaml
# docker-compose.yml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
```

```bash
# .env.local (generated by CLI or manually)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/myapp
BETTER_AUTH_SECRET=your-secret-here   # generate: openssl rand -base64 32

# Optional (only if selected during scaffold):
STRIPE_SECRET_KEY=sk_test_...
RESEND_API_KEY=re_...
```

**`scripts/check-env.ts`** — runs before `npm run dev`:
```typescript
const required = [
  { key: 'DATABASE_URL', hint: 'Run docker compose up -d, then use postgresql://postgres:postgres@localhost:5432/myapp' },
  { key: 'BETTER_AUTH_SECRET', hint: 'Generate: openssl rand -base64 32' },
  // conditional: STRIPE_SECRET_KEY if payments selected, etc.
]
// Prints a clear error box for each missing variable and exits 1
// Never silently swallows a missing env var
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
jobs:
  test-cli:
    strategy:
      matrix:
        node: [18.18, 20.x, 22.x]
        os: [ubuntu-latest, macos-latest]
    steps:
      - npm ci
      - npm run build
      - npm run test  # Vitest integration tests

  test-template:
    steps:
      - scaffold to temp dir (defaults)
      - npm install in scaffolded project
      - tsc --noEmit
      - next build (with stubbed env vars)

  publish:
    needs: [test-cli, test-template]
    if: startsWith(github.ref, 'refs/tags/v')
    steps:
      - npm publish (create-pkstack)
      - npm publish (@pkstack/config)
```

### CLI Integration Tests

```
packages/cli/src/__tests__/scaffold.test.ts

✓ happy path: web + all defaults → files exist, package.json name correct
✓ happy path: tRPC excluded → no `src/server/`, no `src/app/api/trpc/`, and no tRPC deps in `package.json`
✓ happy path: no payments → no Stripe env vars in .env.example
✓ gstack install success → .claude/skills/gstack/ exists
✓ gstack install failure → scaffold completes, warning box printed
✓ partial failure cleanup → output directory removed on error
✓ setup-gstack subcommand → .claude/skills/gstack/ created in CWD
✓ duplicate directory → warn and abort, no overwrite
✓ project name with special chars → sanitized correctly
```

### v0.1 Success Criteria

**Engineering done:**
- `npm create pkstack my-app` completes in under 2 minutes (files only, no npm install)
- Scaffolded project passes `tsc --noEmit` with zero errors
- Scaffolded project passes `next build` (with stubbed env vars)
- `npm run dev` works without crashing (with docker compose up or Neon URL)
- gstack skills available in scaffolded project (or clear `npx create-pkstack setup-gstack` fallback)
- All CLI integration tests pass on Node 18/20/22, macOS/Ubuntu
- `@pkstack/config` published to npm; `create-pkstack` published to npm
- Scaffolded dependencies are pinned to a curated exact-version compatibility set

**Launch:**
- Post on X, tag @t3dotgg, @mintlify, Convex team
- README includes the one-sentence pitch and a GIF/video of the scaffold

---

## Stage 2: v0.2 Specification

*Start v0.2 once v0.1 is shipped and at least one person other than the author
has used `npm create pkstack` and given feedback.*

### Deliverables
1. Extract `@pkstack/ui` from template code
2. Extract `@pkstack/db` from template code
3. Extract `@pkstack/auth` from template code
4. Extract `@pkstack/ai` from template code (Vercel AI SDK wrappers + AgentKit)
5. Extract `@pkstack/api` from template code (tRPC router types)
6. `apps/mobile/` Expo reference app
7. `templates/mobile/` + `--mobile` CLI flag
8. `apps/docs/` Mintlify docs site at pkstack.dev
9. E2E tests with Playwright
10. Migrate ESLint variants rule from template → `@pkstack/config`

### Package Contracts (v0.2)

| Package | Primary Exports | Does NOT own |
|---------|----------------|--------------|
| `@pkstack/ui` | Components + typed `variants` const per component | Business logic, data fetching |
| `@pkstack/db` | `db`, consolidated `schema`, migration helpers | Auth schema definition |
| `@pkstack/auth` | `auth`, `getSession`, `middleware`, `authSchema` (Drizzle table def) | UI components, db client |
| `@pkstack/ai` | `createAI`, `useChat`, `streamText` wrapper; AgentKit helpers | Database persistence |
| `@pkstack/api` | tRPC router type definitions (plain TS, no RSC/RN imports) | Implementation, providers |
| `@pkstack/config` | tsconfig presets, eslint config, tailwind preset, `require-variants` rule | App-level config |

**AgentKit** (`@pkstack/ai`): pre-built patterns for streaming tool calls, multi-step
reasoning, and context-window management on top of Vercel AI SDK. Not a new framework —
composable helpers for common AI agent tasks.

### v0.2 Success Criteria
- `@pkstack/*` packages published to npm individually
- `create-pkstack` CLI updated to use `@pkstack/*` imports (not inline template code)
- Mobile template: `--mobile` flag scaffolds Expo app, `expo prebuild` passes in CI
- Docs site live at pkstack.dev

---

## Stage 3: v0.3 Roadmap (no spec yet)

- Community template registry (`create-pkstack --template community/saas-crm`)
- pkstack plugin system (add features post-scaffold: `npx create-pkstack add stripe`)
- `@pkstack/agent` — first-class agent task patterns (plan, code, review loop)
- Showcase apps built with pkstack

---

## Open Questions

1. **GitHub org:** `pkyanam/pkstack` or a dedicated `pkstack` org? Blocks CI/CD setup.
2. **tRPC vs. Hono for mobile/API-first projects:** Make Hono an alternative CLI option in v0.2?
3. **PGlite vs. Docker Compose for local dev:** PGlite requires no Docker, but Docker Compose is closer to production. Default to Docker Compose with a PGlite fallback?
4. **npm workspaces vs. Turborepo for v0.1:** Three packages — is Turborepo overhead worth it, or use plain npm workspaces until v0.2?

---

## Distribution Plan

| Artifact | Where | When |
|----------|-------|------|
| `create-pkstack` | npm registry | v0.1 |
| `@pkstack/config` | npm registry | v0.1 |
| `@pkstack/*` packages | npm registry | v0.2 |
| docs | pkstack.dev (Mintlify) | v0.2 |
| GitHub | `pkyanam/pkstack` or `pkstack` org | Before v0.1 |

**Versioning:** Changesets-driven, independent per package.

**Announcement:** X post targeting Theo, Mintlify, Convex communities. README first,
docs site second.

---

## Implementation Order

*See TODOS.md for tracked items. See eng review test plan for test spec.*

### Phase 1: Monorepo foundation (prerequisite for everything)
1. Decide GitHub org → create repo → `git init`
2. Turborepo monorepo skeleton: `packages/`, `apps/`, `templates/`
3. Root `AGENTS.md` + `CLAUDE.md` (with gstack skill routing)
4. `packages/config`: tsconfig base/nextjs/node + eslint + tailwind preset
5. `scripts/setup-gstack.sh` for contributors
6. `CONTRIBUTING.md`

### Phase 2: Web template (parallel with Phase 3)
7. `templates/web/` skeleton: Next.js 15 + TypeScript strict + Tailwind v4
8. Auth: run `npx auth@latest generate`, commit `auth-schema.ts`, wire Better Auth
9. Database: Drizzle + consolidated `drizzle.config.ts` + `docker-compose.yml`
10. tRPC v11 App Router boilerplate: `trpc.ts`, `query-client.ts`, `provider.tsx`, `server.ts`
11. AI: Vercel AI SDK basic setup in template
12. Payments: Stripe setup (conditional on CLI flag)
13. Email: Resend setup (conditional on CLI flag)
14. `scripts/check-env.ts` pre-dev env validation
15. `AGENTS.md` + `CLAUDE.md` in template
16. Template passes `tsc --noEmit` + `next build`

### Phase 3: CLI (parallel with Phase 2)
17. `packages/cli/` skeleton: TypeScript, bin entry point, build pipeline
18. Prompt flow (clack for prompts): name, tRPC, payments, email
19. File generation: copy + template `templates/web/` with user choices applied
20. Cleanup on partial failure
21. `.env.example` + `.env.local` generation
22. gstack tarball install (`GSTACK_VERSION` pinned, loud failure box)
23. `setup-gstack` subcommand
24. CLI integration tests (Vitest)

### Phase 4: CI/CD + publish
25. GitHub Actions: test-cli + test-template (scaffold → npm install → tsc → next build)
26. Publish workflow: semver tag → npm publish
27. README: one-sentence pitch + scaffold GIF
28. Publish `create-pkstack@vX.Y.Z` + `@pkstack/config@vX.Y.Z`
29. X post: tag @t3dotgg, @mintlify, Convex

---

*Built with Claude Code, reviewed with gstack.*
