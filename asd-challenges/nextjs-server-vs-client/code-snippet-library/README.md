# Code Snippet Library (Next.js Server vs. Client)

Builds on [Code Snippet Library (Next.js App Router)](../../nextjs-approuter/code-snippet-library/README.md).

> **Status: unfinished.** The snippets are read from Postgres (`lib/db.ts`, tagged templates, table and seed in `instrumentation.ts`). Next: use `SnippetFilter` on `/snippets` with the languages from the data, add `language` and `description` fields to the new snippet form (the table requires them), and add the API routes `GET /api/snippets`, `GET /api/snippets/[id]` and `POST /api/snippets`.

## Run

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Set `DATABASE_URL` in `.env` to a running Postgres database. The `snippets` table is created and seeded on server start. Open http://localhost:3000.
