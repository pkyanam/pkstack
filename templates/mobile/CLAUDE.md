# templates/mobile — CLAUDE.md

## What this is

The source-of-truth Expo scaffold for pkstack.

If the generated mobile app should change, start here.

## Common tasks

```bash
npm install
npm run typecheck
npm run start
CI=1 npx expo prebuild --no-install
```

## Ownership rules

- shared contracts belong in `@pkstack/api`
- shared AI helpers belong in `@pkstack/ai`
- mobile-specific UI and app state belong in the app
- web-only packages do not belong here
