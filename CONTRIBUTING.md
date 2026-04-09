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
| `templates/web/` | **Source of truth** for what `npm create pkstack` produces. Must always compile and build. |
| `apps/` | Reserved for later-stage reference apps and docs. Stage 1 ships the published packages plus `templates/web/`. |

## Key rules

### `templates/web` is the source of truth

Every change to the scaffold output must be made in `templates/web/`. After editing:

```bash
cd templates/web
npx tsc --noEmit     # must pass
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/testdb \
BETTER_AUTH_SECRET=test-secret-for-ci-only-not-real \
BETTER_AUTH_URL=http://localhost:3000 \
npx next build
```

CI will run both checks on every PR.

### Dependency policy

The scaffolded app uses exact dependency versions, not caret ranges and never `"*"`.
When updating framework or library versions, treat it as a curated compatibility set:
update the template, rebuild the bundled CLI template, and verify a real generated app
with `npm install`, `npm run typecheck`, and `npm run build`.

### Conditional template features

Features that are optional (tRPC, Stripe, Resend) are handled in `packages/cli/src/scaffold.ts` — the file generation logic strips or injects files based on user choices. Do not gate features inside `templates/web/` with env checks. Gate them in the CLI scaffold logic.

### Testing the CLI locally

```bash
# Build the CLI
npm run build -w packages/cli

# Link it globally
cd packages/cli && npm link

# Run it
npm create pkstack test-app
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

The `publish` CI job publishes `create-pkstack` and `@pkstack/config` to npm automatically.
