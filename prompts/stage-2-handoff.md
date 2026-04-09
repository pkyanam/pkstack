# Docs Deployment Handoff Prompt

You are taking over pkstack after the `v0.2.1` release.

Read these first:

- `README.md`
- `AGENTS.md`
- `CLAUDE.md`
- `CONTRIBUTING.md`
- `apps/docs/AGENTS.md`
- `apps/docs/CLAUDE.md`

## Current State

The CLI and packages are published.

What is done:

- published `create-pkstack`
- published `@pkstack/config`
- published `@pkstack/ui`, `@pkstack/db`, `@pkstack/auth`, `@pkstack/ai`, and `@pkstack/api`
- source-of-truth web and mobile templates
- reference mobile app
- Mintlify docs content in `apps/docs`

## Next Product Step

Publish the docs website through Mintlify and point:

- `pkstack.preetham.org`

at that deployed site.

## Constraints

- docs must continue to describe the repo as it actually exists
- do not start Stage 3 product work
- keep package/template/docs ownership boundaries explicit
- if deployment requires a wrapper or a different production path than local Mint preview, document that clearly

## Expected Outcome

When you finish, the public docs story should be coherent:

- packages already published
- docs hosted publicly
- root docs and Mintlify docs agree on the deployment path
