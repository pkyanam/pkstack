# TODOS

## v0.2.0 completed

- [x] Extract `@pkstack/ui`, `@pkstack/db`, `@pkstack/auth`, `@pkstack/ai`, and `@pkstack/api`
- [x] Rewire `templates/web` to consume the extracted packages
- [x] Add `templates/mobile/` and CLI `--mobile` support
- [x] Add `apps/mobile/` reference Expo app
- [x] Add `apps/docs/` Mintlify content site
- [x] Move the ESLint `require-variants` rule into `@pkstack/config`
- [x] Add Playwright scaffold E2E coverage
- [x] Publish `create-pkstack`, `@pkstack/config`, and the Stage 2 runtime packages

## Next step

- [x] Publish the docs site through Mintlify
- [x] Point `pkstack.preetham.org` at the deployed docs site
- [x] Smoke-test the published mobile npm flow from a clean external directory
- [ ] Publish the web scaffold type fix in `v0.2.2`
- [ ] Re-run the published web npm smoke test after `v0.2.2` is live

## Follow-up cleanup

- [ ] Remove the Mint React workaround if a newer Mint release makes it unnecessary
- [ ] Revisit the root `overrides` block after the next Mint upgrade
- [ ] Decide whether `apps/docs` stays Mint-only or gets a small production deployment wrapper
