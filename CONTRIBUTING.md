# Contributing to pkstack

## What you are contributing to

pkstack is not just a Next.js template. It is a scaffold system:

1. shared published packages
2. source-of-truth templates
3. the CLI that copies and edits those templates
4. reference apps/docs that validate the shape of the system

The fastest way to break pkstack is to change one layer without understanding the layer above or below it.

## Prerequisites

- Node.js `>=18.18`
- npm `>=10`
- Docker for local Postgres testing of the web scaffold

## Setup

```bash
git clone https://github.com/pkyanam/pkstack
cd pkstack
npm install
./scripts/setup-gstack.sh
```

## Repo map

| Path | Role |
|------|------|
| `packages/cli/` | `create-pkstack` binary and scaffold logic |
| `packages/config/` | shared tsconfig, ESLint, Tailwind, and lint rules |
| `packages/ui/`, `db/`, `auth/`, `ai/`, `api/` | shared published runtime packages |
| `templates/web/` | source-of-truth Next.js scaffold |
| `templates/mobile/` | source-of-truth Expo scaffold |
| `apps/mobile/` | reference Expo app |
| `apps/docs/` | Mintlify docs content that will be deployed to Vercel |

## The rule that matters most

### Templates are the scaffold source of truth

If a generated app file should change, edit `templates/web` or `templates/mobile`.

If behavior depends on scaffold choices, edit `packages/cli/src/scaffold.ts`.

If shared runtime ownership changes, edit `packages/*`.

Do not author changes directly in `packages/cli/templates/*`. Those files are build artifacts copied from `templates/*`.

## Recommended development loop

### 1. Make the change in the right layer

- package ownership change -> `packages/*`
- generated app structure change -> `templates/*`
- conditional scaffold behavior change -> `packages/cli/src/scaffold.ts`
- docs/reference-only change -> `apps/*`

### 2. Validate the repo

```bash
npm run build
npm run lint
npm run typecheck
npm test
```

### 3. Validate the actual generated output

```bash
npm run build -w packages/cli
PKSTACK_LOCAL_WORKSPACE=1 node packages/cli/dist/index.js test-app
PKSTACK_LOCAL_WORKSPACE=1 node packages/cli/dist/index.js test-mobile --mobile
```

Then verify the generated apps inside those temporary directories.

## Web template checks

```bash
cd templates/web
npx tsc --noEmit
SKIP_ENV_VALIDATION=true \
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/testdb \
BETTER_AUTH_SECRET=test-secret-for-ci-only-not-real \
BETTER_AUTH_URL=http://localhost:3000 \
npx next build
```

## Mobile template checks

```bash
cd templates/mobile
npm run typecheck
CI=1 npx expo prebuild --no-install
```

## Fresh scaffold checks

For a generated web app:

```bash
npm install
npm run typecheck
npm run build
```

For a generated mobile app:

```bash
npm install
npm run typecheck
CI=1 npx expo prebuild --no-install
```

## Dependency policy

- use exact versions in scaffold output
- treat version changes as a curated compatibility set
- do not casually loosen ranges in templates
- if a package is shared across scaffolded apps, prefer package ownership over copy-paste

## Documentation policy

The repo docs should explain pkstack end to end:

- what is published
- what is scaffolded
- what is source of truth
- what is reference-only
- what is already shipped
- what is still planned

Current planned platform step:

- keep the docs site in sync with the live Mintlify deployment at `pkstack.preetham.org`
- smoke-test the published npm flow after each tagged release

## Release flow

Releases are cut from `main` with a semver tag:

```bash
git tag vX.Y.Z
git push origin main --tags
```

GitHub Actions publishes npm packages from the tag workflow.

## Common mistakes

1. Editing `packages/cli/templates/*` instead of `templates/*`
2. Putting conditional logic into templates instead of the CLI
3. Duplicating package-owned runtime code back into the templates
4. Validating only the monorepo and not a fresh scaffold
5. Documenting future plans as already shipped
