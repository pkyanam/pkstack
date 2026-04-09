# templates/web — CLAUDE.md

## What this is

The source-of-truth generated web app for pkstack.

If a fresh `npm create pkstack` web app should change, start here.

## Common tasks

```bash
# start local services
docker compose up -d

# configure env
$EDITOR .env.local

# install and run
npm install
npm run db:migrate
npm run dev

# validate
npx tsc --noEmit
SKIP_ENV_VALIDATION=true \
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/testdb \
BETTER_AUTH_SECRET=test-secret-for-ci-only-not-real \
BETTER_AUTH_URL=http://localhost:3000 \
npx next build
```

## Ownership rules

- app feature logic belongs here
- shared runtime code belongs in `@pkstack/*`
- scaffold-time branching belongs in the CLI

## Common extensions

- add tables in `src/db/schema.ts`
- add routers in `src/server/api/routers/*`
- add app routes in `src/app/*`
- keep auth wiring on top of `@pkstack/auth`
- keep db wiring on top of `@pkstack/db`
