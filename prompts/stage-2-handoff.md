# v0.2.0 Release Handoff Prompt

You are taking over release-closeout work for the `pkstack` monorepo.

Read these first:

- `AGENTS.md`
- `README.md`
- `CHANGELOG.md`
- `TODOS.md`
- `packages/cli/AGENTS.md`
- `apps/docs/AGENTS.md`

## Current State

The codebase has already been moved to `0.2.0`.

Stage 2 is implemented in the repo:

- `@pkstack/ui`, `@pkstack/db`, `@pkstack/auth`, `@pkstack/ai`, and `@pkstack/api` exist as workspace packages
- `templates/web` consumes those packages
- `templates/mobile` exists and the CLI supports `--mobile`
- `apps/mobile` and `apps/docs` exist
- Playwright scaffold E2E coverage exists
- `@pkstack/config` owns the shared `require-variants` ESLint rule

The repo is prepared for a `v0.2.0` git tag, but the public release is not fully closed:

- the Stage 2 packages still need to be published to npm
- the docs site still needs a final hostname and deployment

## Already Verified

These checks have already passed locally:

- `npm install`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- fresh web scaffold from the built CLI:
  - `npm install`
  - `npm run typecheck`
  - `npm run build`
- fresh mobile scaffold from the built CLI:
  - `npm install`
  - `npm run typecheck`
  - `CI=1 npx expo prebuild --no-install`

## Important Repo Details

- root package version is `0.2.0`
- workspace packages and templates are versioned `0.2.0`
- CLI template version is `0.2.0`
- local unpublished-package verification uses `PKSTACK_LOCAL_WORKSPACE=1`
- the docs app currently uses a Mint workaround in `apps/docs/scripts/fix-mint-react.mjs` to avoid a duplicate React runtime

## What Still Needs Attention

Do only release-closeout work unless explicitly redirected:

1. Publish `create-pkstack`, `@pkstack/config`, and the Stage 2 runtime packages
2. Decide the docs host and deploy `apps/docs`
3. Confirm CI secrets such as `NPM_TOKEN`
4. Optionally remove or reduce the Mint workaround if upstream fixes the packaging issue

Do not start Stage 3 work.

## Documentation Contract

Keep docs aligned with actual repo state:

- Stage 2 code is done in-repo
- npm publishing is still pending
- docs deployment/domain is still pending
- if you choose a temporary hostname such as `pkstack.preetham.org`, update docs to say so explicitly

## Expected Final Output

When you finish, report:

- what release-closeout work you completed
- whether `v0.2.0` is now actually ready to publish publicly
- any remaining blockers outside the repo
