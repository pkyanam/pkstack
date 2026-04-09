# Contributing to pkstack

## Prerequisites

- Node.js >= 18.18
- npm >= 10
- Docker (for local Postgres when testing the template)

## Setup

```bash
git clone https://github.com/pkyanam/pkstack
cd pkstack
npm install

# Install gstack (AI agent workflow toolchain — gitignored)
./scripts/setup-gstack.sh
```

## Repo structure

| Path | What it is |
|------|-----------|
| `packages/cli/` | `create-pkstack` binary. Source of CLI prompts, file generation, gstack install. |
| `packages/config/` | `@pkstack/config` — shared tsconfig/eslint/tailwind presets. |
| `packages/ui/`, `db/`, `auth/`, `ai/`, `api/` | Stage 2 runtime packages consumed by the templates/apps. |
| `templates/web/` | **Source of truth** for the web scaffold output. Must always compile and build. |
| `templates/mobile/` | **Source of truth** for the mobile scaffold output. |
| `apps/mobile/` | In-repo Expo reference app. |
| `apps/docs/` | Mintlify-format docs site. |

## Key rules

### Templates are the source of truth

Every change to scaffold output must be made in `templates/web/` or `templates/mobile/`, then validated via the built CLI. After editing the web template:

```bash
cd templates/web
npx tsc --noEmit     # must pass
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/testdb \
BETTER_AUTH_SECRET=test-secret-for-ci-only-not-real \
BETTER_AUTH_URL=http://localhost:3000 \
npx next build
```

CI will run both checks on every PR.

For the mobile template:

```bash
cd templates/mobile
npm install
npm run typecheck
CI=1 npx expo prebuild --no-install
```

### Dependency policy

The scaffolded app uses exact dependency versions, not caret ranges and never `"*"`.
When updating framework or library versions, treat it as a curated compatibility set:
update the template, rebuild the bundled CLI template, and verify a real generated app
with `npm install`, `npm run typecheck`, and `npm run build`.

### Conditional template features

Features that are optional (tRPC, Stripe, Resend, mobile template selection) are handled in `packages/cli/src/scaffold.ts`. Do not gate scaffold variants inside the templates with app-time checks. Gate them in the CLI scaffold logic.

### Testing the CLI locally

```bash
# Build the CLI
npm run build -w packages/cli

# For unpublished Stage 2 packages, rewrite @pkstack/* deps to local file: paths
PKSTACK_LOCAL_WORKSPACE=1 node packages/cli/dist/index.js test-app
PKSTACK_LOCAL_WORKSPACE=1 node packages/cli/dist/index.js test-mobile --mobile
```

### GSTACK_VERSION

`packages/cli/src/constants.ts` pins the gstack version. To bump it:

1. Check the latest gstack release tag on GitHub
2. Update `GSTACK_VERSION` in `constants.ts`
3. Open a PR titled `chore: bump gstack to vX.Y.Z`
4. Include the gstack release notes in the PR body

### AGENTS.md

Every package, app, and template must have an `AGENTS.md` with these four H2 headings:

```markdown
## Purpose
## Public API
## Do Not Modify
## Common Agent Mistakes
```

This is enforced by the lint pipeline.

## CI

PRs run:
- `test-cli` — builds and unit-tests the CLI on Node 18/20/22 × macOS/Ubuntu
- `test-template` — scaffolds to a temp dir, runs `tsc --noEmit` + `next build`

Both must pass before merging.

## Releases

Releases are cut from `main` using a semver tag:

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

The publish flow now needs to cover `create-pkstack`, `@pkstack/config`, and the Stage 2 `@pkstack/*` runtime packages.

Current release-prep target:

- Codebase version: `0.2.0`
- Git tag to push: `v0.2.0`
- Remaining release blockers: npm publish for Stage 2 packages and docs deployment/domain choice
