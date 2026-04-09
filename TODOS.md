# TODOS

## v0.2.0 shipped in-repo

- [x] Extract `@pkstack/ui`, `@pkstack/db`, `@pkstack/auth`, `@pkstack/ai`, and `@pkstack/api`
- [x] Rewire `templates/web` to consume the extracted packages
- [x] Add `templates/mobile/` and CLI `--mobile` support
- [x] Add `apps/mobile/` reference Expo app
- [x] Add `apps/docs/` Mintlify content site
- [x] Move the ESLint `require-variants` rule into `@pkstack/config`
- [x] Add Playwright scaffold E2E coverage
- [x] Verify repo build/lint/typecheck/test plus fresh web/mobile scaffolds

## Still open before a public v0.2 release

- [ ] Publish `create-pkstack`, `@pkstack/config`, and the Stage 2 `@pkstack/*` runtime packages to npm
- [ ] Decide the docs hostname and deploy `apps/docs`
- [ ] Confirm `NPM_TOKEN` and any docs-hosting secrets are configured in GitHub Actions
- [ ] Smoke-test install from the published packages instead of local workspace overrides

## Next-agent cleanup

- [ ] Remove the Mint React dedupe workaround if a Mint release makes it unnecessary
- [ ] Review whether the root `overrides` block is still needed after the next Mint upgrade
- [ ] Triage remaining non-blocking Expo warnings from `expo prebuild`
