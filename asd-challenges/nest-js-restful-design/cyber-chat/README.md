# Cyber Chat (NestJS RESTful Design)

Builds on [Cyber Chat (NestJS TypeORM)](../../nest-js-typeorm/cyber-chat/README.md).

The threaded discussion API with RESTful best practices: request DTOs validated by a global `ValidationPipe`, response DTOs serialized with `ClassSerializerInterceptor` (only `@Expose()` fields reach the client), proper status codes, `ParseUUIDPipe` on every `:id`, and a paginated thread list. All tasks and bonus tasks are done.

## Run

```bash
pnpm install
cp .env.example .env
pnpm db:seed
pnpm dev
```

`db:seed` recreates the database in `data/cyber-chat.sqlite` and fills it with sample threads and comments. The API runs on http://localhost:3000.

## Routes

| Method | Route                       | Purpose                                      | Success |
| ------ | --------------------------- | -------------------------------------------- | ------- |
| GET    | `/api/threads`              | Paginated thread list (see query parameters) | 200     |
| POST   | `/api/threads`              | Create a thread with title, body and author  | 201     |
| GET    | `/api/threads/:id`          | Get one thread including its comments        | 200     |
| PATCH  | `/api/threads/:id`          | Update some fields of a thread               | 200     |
| DELETE | `/api/threads/:id`          | Delete a thread and all of its comments      | 204     |
| POST   | `/api/threads/:id/comments` | Add a comment with body and author           | 201     |
| GET    | `/api/comments`             | List all comments                            | 200     |
| GET    | `/api/comments/:id`         | Get one comment                              | 200     |
| DELETE | `/api/comments/:id`         | Set the comment's body to "deleted"          | 204     |

Query parameters for `GET /api/threads`:

| Parameter   | Default      | Rules                                                   |
| ----------- | ------------ | ------------------------------------------------------- |
| `page`      | `1`          | integer, at least 1                                     |
| `limit`     | `10`         | integer, 1 to 100                                       |
| `sort`      | `-createdAt` | `-createdAt` (newest first) or `createdAt`              |
| `author`    |              | exact author name                                       |
| `startDate` |              | any parseable date, e.g. `2026-05-27` (`ParseDatePipe`) |

The response always has the shape `{ data, meta: { page, limit, total, totalPages } }`. Invalid IDs, query parameters or bodies return `400`, unknown threads and comments `404`.

The `bruno/Cyber-Chat` folder contains a [Bruno](https://www.usebruno.com) collection with all requests.
