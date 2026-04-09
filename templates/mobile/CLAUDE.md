# templates/mobile — CLAUDE.md

## What this is

The scaffolded Expo app output. See `AGENTS.md` for the ownership boundaries.

## gstack skills

| Task | Skill |
|------|-------|
| QA this app | `/qa` |
| Debug a native/runtime issue | `/investigate` |
| Review a mobile PR | `/review` |

## Common tasks

```bash
npm install
npm run typecheck
npm run start

# Validate native project generation
npx expo prebuild --non-interactive
```

## Conventions

- Shared API and AI helpers should come from `@pkstack/*`.
- Keep the Expo template thin; app feature state lives in the app, not in shared config packages.
