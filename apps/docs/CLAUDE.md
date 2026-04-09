# apps/docs — CLAUDE.md

## What this is

The Mintlify docs content for pkstack.

It currently supports:

- local preview via `mint dev`
- content validation via `npm run build`

It does not yet represent a finished public deployment path by itself. The planned public host is `pkstack.preetham.org` through Mintlify.

## Common tasks

```bash
npm run dev
npm run build
```

## Documentation rules

- explain pkstack from top to bottom, not page-by-page in isolation
- distinguish published packages from source-of-truth templates
- distinguish templates from reference apps
- keep the docs deployment plan explicit: Mintlify + `pkstack.preetham.org`
