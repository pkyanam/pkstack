# apps/mobile — CLAUDE.md

## What this is

The in-repo Expo reference app for pkstack.

It is useful for validating package and template changes, but it is not the source-of-truth scaffold template.

## Common tasks

```bash
npm install
npm run typecheck
npm run start
CI=1 npx expo prebuild --no-install
```

## Rules

- change `templates/mobile` if scaffold output should change
- keep shared contracts in packages
- keep the mobile app separate from web-specific runtime concerns
