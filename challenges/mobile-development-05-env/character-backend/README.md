# Character Backend

A small REST API for Rick and Morty characters, built with NestJS. It's the local backend for the [Rick and Morty Gallery (Env)](../rick-and-morty-gallery) app, which creates, edits and deletes characters through it.

## Features

- CRUD endpoints for characters under `/api/characters`
- Paginated list with a case-insensitive name search, in the same response shape as the Rick and Morty API
- Request validation with zod (body, query and path params), with one error message per field
- SQLite database with TypeORM migrations, applied automatically on start
- Seeds all characters from the [Rick and Morty API](https://rickandmortyapi.com) into an empty database on first start
- Environment variables validated with zod at startup
- Unit and e2e tests with Vitest, and a Bruno collection with assertions

## Tech stack

- NestJS 12 (ESM), TypeScript
- TypeORM with `better-sqlite3`
- zod for validation and config, `@nestjs/config`
- Vitest and Supertest
- ESLint, Prettier and GitHub Actions CI
- Bruno for manual API requests

## Getting started

```bash
cp .env.example .env
npm install
npm run start:dev
```

The API runs on [http://localhost:3000/api/characters](http://localhost:3000/api/characters). On the first start it creates `data/characters.sqlite`, runs the migrations and seeds the 826 characters.

To reach it from a phone on the same Wi-Fi, use your computer's local IP address instead of `localhost`, for example `http://192.168.178.42:3000/api`. The [app's README](../rick-and-morty-gallery#getting-started) explains how to find it.

### Environment variables

All variables are optional, the defaults work out of the box.

| Variable        | Default                  | Description                                       |
| --------------- | ------------------------ | ------------------------------------------------- |
| `PORT`          | `3000`                   | Port of the API                                   |
| `DB_FILE`       | `data/characters.sqlite` | Path of the SQLite database file                  |
| `SEED_ON_START` | `true`                   | Seed an empty database on start (`false` to skip) |

## API

| Method   | Route                                       | Response                                          |
| -------- | ------------------------------------------- | ------------------------------------------------- |
| `GET`    | `/api/characters?page=1&limit=20&name=rick` | `{ info: { count, pages, next, prev }, results }` |
| `GET`    | `/api/characters/:id`                       | The character, or `404`                           |
| `POST`   | `/api/characters`                           | `201` with the created character                  |
| `PUT`    | `/api/characters/:id`                       | `200` with the updated character, or `404`        |
| `DELETE` | `/api/characters/:id`                       | `204`, or `404`                                   |

`page` and `limit` are optional (`limit` is 1–100, default 20). Invalid input returns `400` with a list of messages.

`POST` and `PUT` take the full character:

```json
{
	"name": "Space Beth",
	"status": "Alive",
	"species": "Human",
	"type": "Clone",
	"gender": "Female",
	"origin": { "name": "Earth (C-137)" },
	"location": { "name": "Space" },
	"image": "https://rickandmortyapi.com/api/character/avatar/38.jpeg"
}
```

`status` is `Alive`, `Dead` or `unknown`, `gender` is `Female`, `Male`, `Genderless` or `unknown`, `type` is optional and `image` must be an http(s) URL. Unknown fields are rejected.

## Scripts

```bash
npm run start:dev     # start with watch mode
npm run check         # lint + format check + typecheck
npm test              # unit tests
npm run test:e2e      # e2e tests against an in-memory database
npm run build         # build to dist/
```

## Database

### Migrations

The schema is managed with TypeORM migrations in `src/migrations/`. After changing an entity:

```bash
npm run migration:generate -- src/migrations/DescribeTheChange
```

Then add the new migration class to the array in `src/migrations/index.ts`. Pending migrations run automatically when the server starts, or manually with `npm run migration:run`. `npm run migration:show` lists them and `npm run migration:revert` undoes the last one.

### Reset

To start over with a freshly seeded database, stop the server, delete `data/characters.sqlite` and start it again.

The seed only runs while the database is empty. If it fails (for example without internet), the server keeps running and tries again on the next start, unless characters were created in the meantime.

## Bruno

`bruno/Character-Backend` contains requests for every endpoint, including one with invalid data. Open the folder in [Bruno](https://www.usebruno.com), select the `local` environment and run the collection with the Runner. Create stores the new id, so Update and Delete work on that character and leave the seeded ones untouched.

## Project structure

```text
src/
├── characters/     Entity, zod schemas, controller, service and seeder
├── config/         Environment variable schema
├── migrations/     TypeORM migrations
├── app.module.ts   Config, database and feature modules
├── app.setup.ts    Global /api prefix and validation pipe
├── data-source.ts  Data source for the TypeORM CLI
└── main.ts         Entry point
test/               e2e tests
bruno/              Bruno collection
```

## Credits

The seed data comes from the [Rick and Morty API](https://rickandmortyapi.com). Rick and Morty and its characters belong to their respective owners (Adult Swim). This is a non-commercial learning project.
