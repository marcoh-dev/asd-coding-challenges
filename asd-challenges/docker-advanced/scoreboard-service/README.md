# Scoreboard Service (Docker Advanced)

Builds on the [scoreboard service from Docker Basics](../../docker-basics/scoreboard-service).

> **Status: unfinished.** Challenges 1–3 are done (multi-stage build, named volume, network). Challenge 4 is partly done: `compose.yaml` runs the scoreboard and Postgres, but the scoreboard is still the heartbeat script. Next: turn `src/index.ts` into an HTTP server on `PORT` that reads and writes scores through `DATABASE_URL` (`pg`), map the port from `.env`, then check it at http://localhost:3000 and confirm the scores survive `docker compose down` and `up`.

The scoreboard from the basics session in TypeScript, built with a multi-stage Dockerfile: the builder stage compiles `src/` into `dist/`, the runtime stage only installs production dependencies.

## Run

```bash
cp .env.example .env
docker compose config
docker compose up -d --build
docker compose ps
```

`compose.yaml` starts two services: `scoreboard` (built from the local Dockerfile) and `db` (`postgres:18` with the named volume `pgdata`). The scoreboard reaches the database by its service name `db`; user and password come from `.env`.

```bash
docker compose down      # keeps the pgdata volume
docker compose down -v   # also deletes the data
```
