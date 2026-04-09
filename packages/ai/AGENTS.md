# @pkstack/ai — AGENTS.md

## Purpose

`@pkstack/ai` owns thin, reusable AI SDK helpers for pkstack apps.

It is intentionally small: pkstack wants shared conventions, not a second application framework.

## Public API

- **`createAI(...)`** — reusable AI client helper
- **`streamText(...)`** — shared wrapper around AI SDK streaming
- **`useChat`** — shared chat-hook export
- **`createAgentKit(...)`** — helper bundle for common agent patterns
- **`trimMessages(...)`** — message-window helper

## Do Not Modify

- Keep this package provider-agnostic.
- Do not add persistence or app orchestration state here.
- Keep helpers composable and small.

## Common Agent Mistakes

1. **Hard-coding model vendors into the package** — provider choice should stay app-owned.
2. **Adding database persistence to chat helpers** — storage belongs in apps or another package.
3. **Turning this package into an agent framework** — it should stay a thin helper layer.
