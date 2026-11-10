# Cyber Chat (DevOps Testing)

Builds on [Cyber Chat (NestJS Swagger)](../../nest-js-swagger/cyber-chat/README.md).

> **Status: unfinished.** Task 1 (unit tests for `ThreadsService` and `CommentsService` with mocked repositories) is done. Next: Task 2 (controller integration tests with Supertest), Task 3 (E2E tests against an in-memory SQLite database) and the optional Task 4 (repository failures, malicious payloads).

The threaded discussion API from the previous challenges, tested with Vitest. Vitest uses SWC (`unplugin-swc`) so that NestJS decorators and dependency injection metadata work.

## Run

```bash
pnpm install
cp .env.example .env
pnpm db:seed
pnpm dev
```

Set `JWT_SECRET` in `.env` to a long random string. The API runs on http://localhost:3000, Swagger UI on http://localhost:3000/api.

## Tests

```bash
pnpm test       # unit tests (vitest.config.mjs)
pnpm test:cov   # unit tests with coverage
pnpm test:e2e   # E2E tests (vitest.config.e2e.mjs, *.e2e-spec.ts), none yet
```

The `bruno/Cyber-Chat` folder contains a [Bruno](https://www.usebruno.com) collection with all requests.
