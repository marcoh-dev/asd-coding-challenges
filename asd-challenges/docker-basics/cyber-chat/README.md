# Cyber Chat (Docker Basics)

> **Status: unfinished.** The image builds, but the container exits right away with `sh: nest: not found`: `pnpm install --prod` leaves out the Nest CLI, and `pnpm start` runs `nest start`. Next: install all dependencies and run `pnpm build` in the image, start with `node dist/main.js`, pass the environment variables with `docker run -e` (or `--env-file`), and publish the port with `-p 3000:3000`.

The Cyber Chat starter from the course (NestJS, TypeORM with SQLite, JWT auth, Swagger), packaged as a Docker image. `.dockerignore` keeps `.env`, `node_modules` and `dist` out of the image.

## Run locally

```bash
pnpm install
cp .env.example .env
pnpm start:dev
```

The API runs on http://localhost:3000, Swagger UI on http://localhost:3000/api.

## Docker

```bash
docker build -t cyber-chat .
docker run --name cyber-chat -d -p 3000:3000 -e JWT_SECRET=<secret> -e DATABASE_PATH=db/cyber-chat.db cyber-chat
```
