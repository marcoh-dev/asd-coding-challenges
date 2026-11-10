# Cyber Chat (NestJS Basics 2)

The foundation of a threaded discussion API with NestJS modules, controllers, services and repositories. Threads and comments are stored in memory (`Map`) and seeded from `data/*.seed.json` on every start.

## Run

```bash
bun install
bun run dev
```

The API runs on http://localhost:3000.

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

Unknown threads and comments return a `404` (`NotFoundException`).

The `bruno/Cyber-Chat` folder contains a [Bruno](https://www.usebruno.com) collection with all requests.
