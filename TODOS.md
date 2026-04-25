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
- [x] In-repo **v0.2.3** semver alignment (confirm npm registry after each tag matches published tarballs)
- [ ] Re-run the published **web** npm smoke test from a clean directory when you cut the next tag (human or scripted outside agent Playwright)

## Polish / QoL (current focus)

- [ ] Use **`npm run smoke`** after changes that touch CLI, templates, or `@pkstack/*` builds (CI-parity; no Playwright)
- [ ] Optionally add a GitHub Actions job for `npm run smoke` or `npm run test:e2e` if you want CI to cover browser scaffold tests
- [ ] Keep root + `apps/docs` wording aligned on Mintlify vs any legacy “Vercel docs” phrasing

## Follow-up cleanup

- [ ] Remove the Mint React workaround if a newer Mint release makes it unnecessary
- [ ] Revisit the root `overrides` block after the next Mint upgrade
- [ ] Decide whether `apps/docs` stays Mint-only or gets a small production deployment wrapper
