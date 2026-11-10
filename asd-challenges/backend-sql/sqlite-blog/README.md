## SQLite Blog

Builds on [MVC Pattern Challenge](../../mvc-pattern/mvc-pattern-challenge/README.md).

> **Status: unfinished.** The database connection, table and seed are done, but the blog pages still read `data/posts.json`. Next: add a `slug` column and switch `getPosts`/`getPost` (and their controllers) to the database.

### Scripts

- `npm run dev` — run with `nodemon` and auto-restart on watched file changes.
- `npm run start` — run app directly with `tsx`.
- `npm run typecheck` — run TypeScript checks (`tsc --noEmit`).
- `npm run db:seed` — fill the `blog_entries` table from `db/blog.db.sql` (start the server once first, it creates the table).
