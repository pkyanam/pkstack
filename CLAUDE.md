# pkstack — CLAUDE.md

## Project

pkstack monorepo. See `AGENTS.md` for structure and conventions.

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
- **Template is source of truth.** Never validate template behavior by reading CLI code — run the scaffold and check the output.
- **Agent-legible component exports.** Every UI component in `templates/web/src/components/` must export a typed `variants` const alongside the component.
- **AGENTS.md is required** in every package/app/template. The four H2 headings are mandatory.

## Local dev

```bash
# Install gstack after cloning (gitignored)
./scripts/setup-gstack.sh

# Install dependencies
npm install

# Build the published packages
npm run build -w packages/cli

# Build the template with stub env vars
cd templates/web
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/testdb \
BETTER_AUTH_SECRET=test-secret-for-ci-only-not-real \
BETTER_AUTH_URL=http://localhost:3000 \
npx next build
cd ../..
# Test the CLI locally
node packages/cli/dist/index.js
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
