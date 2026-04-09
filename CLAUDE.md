# pkstack — CLAUDE.md

## Project

pkstack monorepo. See `AGENTS.md` for structure and conventions.

Current release target: `v0.2.0`.
Code is implemented and verified in-repo; package publishing and docs deployment are still pending.

## gstack Skills

This project uses gstack. Skills are in `.claude/skills/gstack/` (gitignored — run `./scripts/setup-gstack.sh` after cloning).

Key skills:
- `/review` — before every merge
- `/ship` — to cut a release
- `/investigate` — for bugs
- `/qa` — to test scaffold output
- `/plan-eng-review` — for architecture decisions

## Conventions

- **TypeScript strict everywhere.** `noUncheckedIndexedAccess: true` in all tsconfigs.
- **Templates are source of truth.** Never validate scaffold behavior only by reading CLI code — run the built CLI and check the generated output.
- **Agent-legible component exports.** Every shared UI component must export a typed `*Variants` const alongside the component.
- **AGENTS.md is required** in every package/app/template. The four H2 headings are mandatory.

## Local dev

```bash
# Install gstack after cloning (gitignored)
./scripts/setup-gstack.sh

# Install dependencies
npm install

# Build the packages
npm run build -w packages/cli
npm run build

# Build the web template with stub env vars
cd templates/web
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/testdb \
BETTER_AUTH_SECRET=test-secret-for-ci-only-not-real \
BETTER_AUTH_URL=http://localhost:3000 \
npx next build
cd ../..

# Validate the mobile template
cd templates/mobile
npm run typecheck
CI=1 npx expo prebuild --no-install
cd ../..

# Test the CLI locally against workspace packages
PKSTACK_LOCAL_WORKSPACE=1 node packages/cli/dist/index.js test-app
```

## Testing

```bash
# Run all tests
npm test

# Test CLI only
npm test -w packages/cli

# Validate the template compiles
cd templates/web && npx tsc --noEmit
```
