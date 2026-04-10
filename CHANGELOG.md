# Changelog

## v0.2.2

Release-prep update with:

- explicit `Auth` type export in `@pkstack/auth`
- scaffolded web auth wiring annotated to avoid a non-portable inferred Better Auth type
- docs/status updated to reflect the live Mintlify site at `pkstack.preetham.org`
- smoke-test notes captured: published mobile flow passed, published web flow needs the `v0.2.2` fix

## v0.2.1

Documentation and release-alignment update with:

- repo-wide docs rewritten to explain pkstack end to end
- expanded Mintlify docs set for overview, getting started, architecture, scaffold flow, packages, release state, and deployment
- clarified deployment target as Mintlify on `pkstack.preetham.org`

## v0.2.0

Published release with:

- extracted runtime packages: `@pkstack/ui`, `@pkstack/db`, `@pkstack/auth`, `@pkstack/ai`, `@pkstack/api`
- shared config package ownership for the `require-variants` lint rule
- rewired web scaffold consuming shared packages
- mobile scaffold plus in-repo Expo reference app
- Mintlify docs app content
- Playwright scaffold E2E coverage

Post-release status:

- npm publishing is complete
- docs are live through Mintlify at `pkstack.preetham.org`
