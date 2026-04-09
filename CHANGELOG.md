# Changelog

## v0.2.0

Codebase release prepared on 2026-04-09.

Included in this release:

- Extract `@pkstack/ui`, `@pkstack/db`, `@pkstack/auth`, `@pkstack/ai`, and `@pkstack/api`
- Rewire the web template to consume shared packages
- Add the mobile template and `--mobile` CLI flow
- Add `apps/mobile` and `apps/docs`
- Move the shared `require-variants` ESLint rule into `@pkstack/config`
- Add Playwright scaffold E2E coverage

Verified locally:

- `npm install`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- fresh generated web app: `npm install`, `npm run typecheck`, `npm run build`
- fresh generated mobile app: `npm install`, `npm run typecheck`, `CI=1 npx expo prebuild --no-install`

Still pending outside the repo:

- publish the Stage 2 packages to npm
- choose and deploy the docs hostname
