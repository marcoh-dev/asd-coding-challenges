# Adventure Chat (OpenAI SDK)

Builds on [Custom ChatGPT (OpenAI API)](../../ai-openai-api/chatgpt-chat/README.md).

> **Status: unfinished.** The chat uses the official `openai` SDK (`lib/openai.ts`), an adventure assistant system prompt and structured output (`{ reply, followups }` as a JSON schema, with the follow-ups shown as clickable suggestions). Next: turn it into the text adventure (game master prompt, `{ story, options, ended }` schema, `stories` and `messages` tables in Postgres) and build the game loop (start a story, option buttons, save every turn, end screen, load stories from the sidebar). Streaming mode still sends the placeholder system prompt `"systemPrompt"` without the JSON schema.

## Run

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Set `OPENAI_API_KEY` and `OPENAI_MODEL` (for example `gpt-4o-mini`) in `.env.local`. Open http://localhost:3000.
