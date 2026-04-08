# TODOS

## v0.1

- [x] **Env validation script** (`scripts/check-env.ts`): runs before `npm run dev`, prints clear action for each missing env var (DATABASE_URL, BETTER_AUTH_SECRET, etc). See `templates/web/scripts/check-env.ts`.

- [x] **gstack version pinning**: `GSTACK_VERSION` constant in `packages/cli/src/constants.ts` pins the gstack release. Update process: PR to bump this constant when gstack releases.

- [x] **CONTRIBUTING.md**: explains how to `./scripts/setup-gstack.sh` after cloning, how `templates/web` is the source of truth, and how to test CLI changes locally with `npm link`.

### Still needed before publish

- [ ] **GitHub repo**: create repo at `pkyanam/pkstack` (or dedicated `pkstack` org — see open question in PRD). Open question must be decided first.
- [ ] **npm install + template compile check**: run `npm install` in `templates/web` and verify `tsc --noEmit` passes. Some imports (better-auth, drizzle, trpc) may need minor version adjustments.
- [ ] **shadcn/ui initialization**: run `npx shadcn@latest init` in `templates/web` to generate `components.json` and populate `src/components/ui/`. Currently the template ships no components.
- [ ] **`tar` import fix in `gstack.ts`**: Node.js built-in `tar` (node:tar) is available in Node 22+; for Node 18/20 compatibility, add `tar` as a dependency or use a polyfill.
- [ ] **`node:tar` compatibility**: Add `tar` npm package as dependency in `packages/cli` and update the `gstack.ts` import accordingly for Node 18/20 support.
- [ ] **Turso support in `scaffold.ts`**: the `patchForTurso` function is a placeholder patch; validate it produces a working `drizzle.config.ts` and `src/db/index.ts`.
- [ ] **CI secrets**: add `NPM_TOKEN` secret to GitHub repo for the publish workflow.

## v0.2

- [ ] Extract `@pkstack/ui`, `@pkstack/db`, `@pkstack/auth`, `@pkstack/ai`, `@pkstack/api` from template code as published packages
- [ ] `apps/mobile/` Expo reference app
- [ ] `apps/docs/` Mintlify docs site at pkstack.dev
- [ ] `templates/mobile/` with `--mobile` CLI flag
- [ ] Migrate ESLint variants rule from template eslint config → `@pkstack/config`
- [ ] E2E tests with Playwright
