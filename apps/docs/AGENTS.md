# apps/docs — AGENTS.md

## Purpose

Mintlify docs content for pkstack.

This app explains the system end to end:

- what pkstack publishes
- how templates, packages, and the CLI fit together
- how a generated app relates to the monorepo
- what the next deployment step is for the public docs site

The next external step for this app is Mintlify deployment at `pkstack.preetham.org`.

## Public API

- **`docs.json`** — Mintlify navigation and site metadata
- **`index.mdx`** — product overview
- **`getting-started.mdx`** — user-facing quickstart
- **`architecture.mdx`** — monorepo and ownership model
- **`scaffold-flow.mdx`** — end-to-end scaffold lifecycle
- **`packages.mdx`** — published package boundaries
- **`stage-2.mdx`** — current release state
- **`deployment.mdx`** — docs and package deployment status

## Do Not Modify

- Keep this app documentation-only. Do not turn it into the production web implementation without a deliberate decision.
- Docs must describe the repo and release state as they actually exist.
- Keep navigation in `docs.json` aligned with the page files on disk.

## Common Agent Mistakes

1. **Writing docs from one directory’s perspective only** — this app should explain the full package -> template -> CLI -> generated-app flow.
2. **Claiming production docs deployment is already done** — the target is Mintlify at `pkstack.preetham.org`, but deployment wiring is still the next task.
3. **Documenting reference apps as scaffold sources** — `apps/*` are references; `templates/*` are the scaffold source of truth.
