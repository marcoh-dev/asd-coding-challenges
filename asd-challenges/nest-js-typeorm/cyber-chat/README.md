# Cyber Chat (NestJS TypeORM)

Builds on [Cyber Chat (NestJS Basics 2)](../../nest-js-basics-2/cyber-chat/README.md).

> **Status: Tasks 1–3 done.** Optional Task 4 is open: turn off `synchronize`, then generate and run the first migration.

The threaded discussion API now stores threads and comments in SQLite with TypeORM (`better-sqlite3`). Both entities use UUIDs, and each comment belongs to a thread (`@ManyToOne`).

## Run

```bash
pnpm install
cp .env.example .env
pnpm db:seed
pnpm dev
```

`db:seed` recreates the database in `data/cyber-chat.sqlite` and fills it with sample threads and comments. The API runs on http://localhost:3000.

## Routes

| Method | Route                       | Purpose                                           |
| ------ | --------------------------- | ------------------------------------------------- |
| POST   | `/api/threads`              | Create a thread with title and body               |
| GET    | `/api/threads`              | List all threads                                  |
| GET    | `/api/threads/:id`          | Get one thread including its comments             |
| POST   | `/api/threads/:id/comments` | Add a comment to a thread                         |
| DELETE | `/api/threads/:id`          | Delete a thread and all of its comments           |
| GET    | `/api/comments`             | List all comments                                 |
| GET    | `/api/comments/:id`         | Get one comment                                   |
| DELETE | `/api/comments/:id`         | Set the comment's body to "deleted" (soft delete) |

The `bruno/Cyber-Chat` folder contains a [Bruno](https://www.usebruno.com) collection with all requests.
