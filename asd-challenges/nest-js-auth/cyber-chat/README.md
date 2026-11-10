# Cyber Chat (NestJS Auth)

Builds on [Cyber Chat (NestJS RESTful Design)](../../nest-js-restful-design/cyber-chat/README.md).

The threaded discussion API with JWT authentication. Users register and log in with a username and password (hashed with bcrypt), and get a JWT that is valid for one hour. A global `JwtAuthGuard` protects every route; routes marked with `@Public()` (registration, login and all reading routes) are open. Threads and comments store the logged-in user as their author, and only the author can edit or delete them. All tasks are done.

## Run

```bash
bun install
cp .env.example .env
bun run db:seed
bun run dev
```

Set `JWT_SECRET` in `.env` to a long random string. `db:seed` recreates the database in `data/cyber-chat.sqlite` and fills it with sample threads and comments. The API runs on http://localhost:3000.

## Routes

| Method | Route                   | Auth   | Purpose                                                                |
| ------ | ----------------------- | ------ | ---------------------------------------------------------------------- |
| POST   | `/auth/register`        | public | Create a user with username and password                               |
| POST   | `/auth/login`           | public | Log in with username and password, returns `access_token`              |
| GET    | `/auth/me`              | JWT    | The logged-in user                                                     |
| GET    | `/threads`              | public | Paginated thread list (`page`, `limit`, `sort`, `author`, `startDate`) |
| GET    | `/threads/:id`          | public | One thread including its comments                                      |
| POST   | `/threads`              | JWT    | Create a thread with title and body                                    |
| PATCH  | `/threads/:id`          | JWT    | Update your own thread                                                 |
| DELETE | `/threads/:id`          | JWT    | Delete your own thread and all of its comments                         |
| POST   | `/threads/:id/comments` | JWT    | Add a comment                                                          |
| GET    | `/comments`             | public | List all comments                                                      |
| GET    | `/comments/:id`         | public | Get one comment                                                        |
| DELETE | `/comments/:id`         | JWT    | Set your own comment's body to "deleted"                               |

Send the token as `Authorization: Bearer <access_token>`. Missing or invalid tokens return `401`, changing someone else's thread or comment returns `403`, and a taken username returns `409`.

The `bruno/Cyber-Chat` folder contains a [Bruno](https://www.usebruno.com) collection with all requests.
