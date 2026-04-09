# @pkstack/ai — AGENTS.md

## Purpose

Shared Vercel AI SDK wrappers and agent workflow helpers for pkstack apps. This package owns model binding, chat hook exports, and context-window helpers.

## Public API

- **`createAI({ model, ...defaults })`** — bind a model and default options into a reusable AI client
- **`streamText(options)`** — pkstack wrapper around Vercel AI SDK `streamText`
- **`useChat`** — re-export of the Vercel AI SDK React chat hook
- **`createAgentKit({ model, ...defaults })`** — helper bundle for common agent patterns
- **`trimMessages(messages, maxMessages?)`** — keep agent context windows bounded

## Do Not Modify

- This package must not add database persistence or message storage concerns.
- Keep the package provider-agnostic. Apps choose models; this package supplies wrappers and conventions.
- Agent helpers should stay composable utilities, not a separate framework.

## Common Agent Mistakes

1. **Hard-coding providers into the package** — keep provider selection app-owned.
2. **Mixing persistence into stream helpers** — storage belongs in apps or other runtime packages.
3. **Treating AgentKit as orchestration state** — it should stay a thin helper layer over the AI SDK.
