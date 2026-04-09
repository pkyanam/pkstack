# Changelog

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
- the remaining public launch step is docs deployment through Mintlify at `pkstack.preetham.org`
