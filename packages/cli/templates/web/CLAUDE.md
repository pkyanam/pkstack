# templates/web — CLAUDE.md

## What this is

The scaffolded project output. See `AGENTS.md` for the file structure and conventions.

## gstack skills

| Task | Skill |
|------|-------|
| QA this app | `/qa` |
| Browse a page | `/browse` |
| Debug an error | `/investigate` |

## Common tasks

```bash
# Local dev
docker compose up -d          # start Postgres
cp .env.example .env.local    # fill in values
npm install
npm run db:migrate            # run migrations
npm run dev

# Add a new DB table
# 1. Edit src/db/schema.ts
# 2. npm run db:generate
# 3. npm run db:migrate

# Add a new tRPC router
# 1. Create src/server/api/routers/your-router.ts
# 2. Add to src/server/api/root.ts

# Regenerate auth schema (after upgrading better-auth)
# npx auth@latest generate
# npm run db:generate
# npm run db:migrate
```

## AI integration

`ai` (Vercel AI SDK) is pre-installed. To add a streaming chat endpoint:

```typescript
// src/app/api/chat/route.ts
import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({ model: anthropic('claude-sonnet-4-6'), messages })
  return result.toDataStreamResponse()
}
```

Set `ANTHROPIC_API_KEY` in `.env.local`.
