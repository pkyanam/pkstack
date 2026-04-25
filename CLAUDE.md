# pkstack — CLAUDE.md

## Project

pkstack is a published starter-kit monorepo.

The repo has one job: produce and maintain a coherent scaffold pipeline from shared packages to templates to the `create-pkstack` CLI to generated apps.

Current state:

- **v0.2.x** — published npm packages and in-repo semver should stay aligned; see `CHANGELOG.md` and tags
- docs are live through Mintlify at `pkstack.preetham.org`
- after substantive changes, prefer **`npm run smoke`** (shell script mirroring core CI steps) over Playwright for agent-side verification

Read `AGENTS.md` first for ownership and repo shape.

## Mental Model

Work from these boundaries:

- `packages/*` own reusable runtime and config code
- `templates/*` own the generated app file structure
- `packages/cli` owns scaffold-time transformations
- `apps/*` are reference apps and docs, not scaffold sources

If you change one layer, validate the layer above it:

- package change -> validate template/app consumers
- template change -> scaffold a fresh app
- CLI change -> rebuild CLI, scaffold fresh app, verify generated output

## gstack Skills

This project uses gstack. Skills live in `.claude/skills/gstack/` after running `./scripts/setup-gstack.sh`.

Common skills:

- `/review` for merge review
- `/ship` for release work
- `/investigate` for bugs
- `/qa` for scaffold verification
- `/plan-eng-review` for architecture changes

## Working Commands

```bash
# install
npm install

# full repo validation
npm run build
npm run lint
npm run typecheck
npm test
npm run smoke

# build the CLI
npm run build -w packages/cli

# local scaffold testing against local unpublished package changes
PKSTACK_LOCAL_WORKSPACE=1 node packages/cli/dist/index.js test-app
PKSTACK_LOCAL_WORKSPACE=1 node packages/cli/dist/index.js test-mobile --mobile

# docs preview
npm run dev -w apps/docs
```

## Web Template Validation

```bash
cd templates/web
npx tsc --noEmit
SKIP_ENV_VALIDATION=true \
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/testdb \
BETTER_AUTH_SECRET=test-secret-for-ci-only-not-real \
BETTER_AUTH_URL=http://localhost:3000 \
npx next build
```

## Mobile Template Validation

```bash
cd templates/mobile
npm run typecheck
CI=1 npx expo prebuild --no-install
```

## Documentation Rules

- docs should explain the full scaffold pipeline, not isolated directories
- docs must distinguish source-of-truth templates from bundled template copies
- docs must distinguish published packages from app-owned code
- docs must state what is shipped versus what is merely planned
- the docs are deployed through Mintlify at `pkstack.preetham.org`
