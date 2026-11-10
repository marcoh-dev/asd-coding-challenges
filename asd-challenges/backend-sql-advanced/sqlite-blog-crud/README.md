## SQLite Blog CRUD

Builds on [SQLite Blog](../../backend-sql/sqlite-blog/README.md).

> **Status: unfinished.** The admin panel (list, create, edit, delete) already works with SQL, but by `id` and without a `slug` column, and the public pages still read `data/posts.json`. Next: `slug` column, slug-scoped UPDATE/DELETE with `result.changes` → 404, pages from the database, `sanitize-html` for the content, delete as POST.

### Scripts

- `pnpm dev` — run with `nodemon` and auto-restart on watched file changes.
- `pnpm start` — run app directly with `tsx`.
- `pnpm typecheck` — run TypeScript checks (`tsc --noEmit`).
- `pnpm db:seed` — fill the `blog_entries` table from `db/blog.db.sql` (start the server once first, it creates the table).
