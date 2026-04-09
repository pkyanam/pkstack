# apps/docs — AGENTS.md

## Purpose

Mintlify docs site for the pkstack docs host. This app documents the current package boundaries, scaffold outputs, and release state of the repo.

## Public API

- **`docs.json`** — Mintlify site configuration and navigation
- **`index.mdx`** — top-level product and quickstart page
- **`stage-2.mdx`** — Stage 2 deliverables and package extraction summary
- **`packages.mdx`** — package surface and release-state reference

## Do Not Modify

- Docs must describe the repo as it actually exists. Do not document imaginary Stage 3 behavior here.
- Keep navigation in `docs.json` aligned with the files on disk.
- This app is documentation only. Do not turn it into a generic Next.js site.

## Common Agent Mistakes

1. **Documenting planned behavior as shipped** — if a feature is unverified or incomplete, say so.
2. **Letting docs drift from package ownership** — update package docs when boundaries move.
3. **Adding framework code here** — the docs app should stay a Mintlify content site.
