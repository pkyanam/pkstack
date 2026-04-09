# TODOS

## v0.1

- [x] **GitHub repo is live** at `pkyanam/pkstack`.
- [x] **Published packages verified** on npm.
- [x] **Template verification**: `templates/web` passes `tsc --noEmit` and `next build` with stub env vars.
- [x] **shadcn/ui baseline exists** in `templates/web/src/components/ui/`.
- [x] **gstack tar extraction works on Node 18/20/22** via the `tar` package in `packages/cli`.
- [x] **Env validation + generated env files**: the CLI generates `.env.example` and `.env.local`, and `scripts/check-env.ts` points users at `.env.local`.
- [x] **Unsupported Turso path removed**: Stage 1 now only advertises the working Postgres/Neon flow.
- [x] **Curated exact dependency set**: scaffolded apps use pinned package versions, and a fresh generated app now passes `npm install`, `npm run typecheck`, and `npm run build`.
- [ ] **Confirm `NPM_TOKEN` remains configured** in GitHub Actions for future releases.

## v0.2

- [ ] Extract `@pkstack/ui`, `@pkstack/db`, `@pkstack/auth`, `@pkstack/ai`, `@pkstack/api` from template code as published packages
- [ ] `apps/mobile/` Expo reference app
- [ ] `apps/docs/` Mintlify docs site at pkstack.dev
- [ ] `templates/mobile/` with `--mobile` CLI flag
- [ ] Migrate ESLint variants rule from template eslint config → `@pkstack/config`
- [ ] E2E tests with Playwright
