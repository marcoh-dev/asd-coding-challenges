# Code Snippet Library (Next.js Ecosystem)

Builds on [Code Snippet Library (Next.js Tailwind and shadcn)](../../nextjs-tailwind-and-shadcn/code-snippet-library/README.md).

> **Status: unfinished.** The new snippet form uses react-hook-form (`register`, `handleSubmit`, validation rules, errors from `formState`), but `onSubmit` only logs the data. Next: save the snippet through a server function, use shadcn `Input` for all fields and connect the labels with `id`s, then build the favorites page (global store, favorite button, `getSnippetsByIds` with `ANY`, persisted in `localStorage`) and the Monaco editor toggle on the detail page.

## Run

```bash
cp .env.example .env
docker compose up -d
pnpm install
pnpm dev
```

`docker-compose.yaml` reads the `POSTGRES_*` values from `.env` and publishes Postgres on port 5433. The `snippets` table is created and seeded on server start (`instrumentation.ts`). Open http://localhost:3000.
