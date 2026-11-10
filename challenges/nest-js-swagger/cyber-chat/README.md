# Cyber Chat (NestJS Swagger)

Builds on [Cyber Chat (NestJS Auth)](../../nest-js-auth/cyber-chat/README.md).

> **Status: unfinished.** Swagger is set up (docs at `/api`, OpenAPI document at `/api-json`, bearer auth scheme, CLI plugin), but the routes and DTOs are not documented yet. Next: `@ApiOperation` summaries, success and error responses, `@ApiBearerAuth()` on protected routes, and `@ApiProperty` where the CLI plugin can't infer enough.

The threaded discussion API with JWT authentication from the previous challenge, plus Swagger documentation.

## Run

```bash
bun install
cp .env.example .env
bun run db:seed
bun run dev
```

Set `JWT_SECRET` in `.env` to a long random string. `db:seed` recreates the database in `data/cyber-chat.sqlite` and fills it with sample threads and comments.

- API: http://localhost:3000
- Swagger UI: http://localhost:3000/api
- OpenAPI document: http://localhost:3000/api-json

The routes are the same as in the auth challenge. The `bruno/Cyber-Chat` folder contains a [Bruno](https://www.usebruno.com) collection with all requests.
