# Code Snippet Library (Next.js Tailwind and shadcn)

Builds on [Code Snippet Library (Next.js Server vs. Client)](../../nextjs-server-vs-client/code-snippet-library/README.md).

> **Status: unfinished.** Tailwind, shadcn/ui, the snippet `Card`s, the button link and the `Input`/`Label` form fields are done. Next: replace the native `<select>` in the language filter and in the form with shadcn's `Select`, read the filter languages from the data, and add the API routes `GET /api/snippets`, `GET /api/snippets/[id]` and `POST /api/snippets` from the previous session.

The snippet library styled with Tailwind CSS and shadcn/ui (Base UI components), backed by Postgres. The `snippets` table is created and seeded on server start (`instrumentation.ts`).

## Run

```bash
cp .env.example .env
docker compose up -d
pnpm install
pnpm dev
```

`docker-compose.yaml` reads the `POSTGRES_*` values from `.env` and publishes Postgres on port 5433. Open http://localhost:3000.
