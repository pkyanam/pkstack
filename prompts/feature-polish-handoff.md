# Handoff — feature polish and end-to-end quality (pkstack)

You are continuing pkstack after doc and validation workflow updates. **Do not rely on local Playwright runs during routine agent work** (they are slow and brittle in this environment). Prefer the smoke script and the same checks CI runs.

## Read first (source of truth)

| File | Why |
|------|-----|
| [AGENTS.md](../AGENTS.md) | Monorepo purpose, public surface, ownership, common mistakes |
| [CLAUDE.md](../CLAUDE.md) | gstack skills, commands, validation paths |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Where edits belong, full contributor loop, release flow |
| [README.md](../README.md) | User-facing pitch, repo layout, `PKSTACK_LOCAL_WORKSPACE` |
| [PRD.md](../PRD.md) | Stages, product intent, Stage 3 roadmap (do not expand into Stage 3 unless asked) |
| [TODOS.md](../TODOS.md) | Tracked follow-ups and cleanup |
| [CHANGELOG.md](../CHANGELOG.md) | What shipped in each tag |
| [apps/docs/AGENTS.md](../apps/docs/AGENTS.md) | Mintlify app boundaries |
| [apps/docs/deployment.mdx](../apps/docs/deployment.mdx) | Docs + npm deployment facts |

Optional deep context: [apps/docs/architecture.mdx](../apps/docs/architecture.mdx), [apps/docs/scaffold-flow.mdx](../apps/docs/scaffold-flow.mdx), [apps/docs/getting-started.mdx](../apps/docs/getting-started.mdx).

## Current product state (repo)

- **v0.2.3** (monorepo manifests): published `create-pkstack`, `@pkstack/config`, and `@pkstack/ui|db|auth|ai|api` on the same semver line; verify npm after each tag.
- **Templates:** `templates/web`, `templates/mobile` are the scaffold source of truth; `packages/cli/templates/*` are build artifacts.
- **Docs:** Mintlify content in `apps/docs`; production target **Mintlify** at `pkstack.preetham.org` (not Vercel for docs).
- **CI:** `.github/workflows/ci.yml` runs CLI matrix tests, in-repo `templates/web` typecheck + `next build`, and lint. It does **not** run Playwright.
- **Local parity without Playwright:** `npm run smoke` runs `scripts/smoke-local.sh` (CLI build/test/typecheck, runtime package builds, web template `tsc` + `next build`, mobile template typecheck). It intentionally skips `expo prebuild` in-tree because prebuild mutates tracked `app.json` / `package.json`; run prebuild manually when needed (see `CONTRIBUTING.md`).

## Your mandate: polish and QoL

1. **Make what exists work end-to-end** — scaffold paths, env generation, template + package boundaries, docs accuracy, contributor scripts.
2. **Prefer** `npm run smoke` after substantive changes; use `npm run build && npm run lint && npm run typecheck && npm test` for the default fast loop.
3. **Playwright** (`npm run test:e2e` or `npm run test:all`) is for humans or CI if wired later — **not** the default agent verification path.
4. After releases, confirm **published npm** smoke (human or scripted outside this handoff) still matches README; update [TODOS.md](../TODOS.md) when done.

## Constraints

- Do not treat `packages/cli/templates/*` as authoring sources.
- Keep `AGENTS.md` H2 contract (`Purpose`, `Public API`, `Do Not Modify`, `Common Agent Mistakes`) intact across packages/apps you touch.
- Do not start **Stage 3** ecosystem work (plugins, community template registry, etc.) unless the user explicitly asks — stay on polish and reliability.

## Useful commands

```bash
npm install
npm run smoke
npm run build && npm run lint && npm run typecheck && npm test

npm run build -w packages/cli
PKSTACK_LOCAL_WORKSPACE=1 node packages/cli/dist/index.js test-app
PKSTACK_LOCAL_WORKSPACE=1 node packages/cli/dist/index.js test-mobile --mobile
```

## Prior handoff

Earlier docs-focused handoff: [prompts/stage-2-handoff.md](./stage-2-handoff.md) (validation after v0.2.2 npm story). This file supersedes it for **ongoing feature polish** work.
