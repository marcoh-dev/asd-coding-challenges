# Custom ChatGPT (OpenAI API)

A ChatGPT-like chat built with Next.js that calls the OpenAI Chat Completions API directly with `fetch` from server functions (`app/actions.ts`).

> **Status: app done.** Open: the first task, exploring the Chat Completions API by hand in Bruno, has no saved collection.

- `sendChat` sends the whole conversation and returns `choices[0].message` (validated with zod)
- `streamChat` sets `stream: true`, reads OpenAI's SSE stream, takes `delta.content` from each `data:` line, skips `[DONE]` and returns the tokens as a `ReadableStream`; the client appends each chunk to the reply as it arrives
- several chats in a sidebar, each titled after its first user message, saved in `localStorage` with `use-local-storage-state`
- the input switches between normal and streamed replies

## Run

```bash
bun install
cp .env.example .env.local
bun run dev
```

Set the values in `.env.local`:

- `OPENAI_API_KEY`: your API key
- `OPENAI_MODEL`: for example `gpt-4o-mini`
- `OPENAI_API_URL`: `https://api.openai.com/v1/chat/completions`

Open http://localhost:3000.
