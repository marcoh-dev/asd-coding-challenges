# Kiki's Delivery Service (Next.js Server vs. Client)

Builds on [Kiki's Delivery Service (Next.js App Router)](../../nextjs-approuter/kikis-delivery-service/README.md).

> **Status: almost done.** All tasks work; the status filter is still missing the "Denied" option.

The delivery app now stores its requests in Postgres and mixes server and client code:

- `/deliveries` is a server component that passes the deliveries to the client component `DeliveryFilter` (status filter without a page reload)
- `/deliveries/new` submits a form to the server function `addDelivery` in `app/actions.ts`; deliveries can also be deleted with a server function
- `/api/deliveries` and `/api/deliveries/[id]` return JSON (`404` for unknown IDs)
- `lib/db.ts` creates the `postgres` client from `DATABASE_URL`; `instrumentation.ts` creates and seeds the `deliveries` table on server start

## Run

```bash
cp .env.example .env
docker compose up -d
pnpm install
pnpm dev
```

Fill in `.env` first: `docker-compose.yaml` reads the `POSTGRES_*` values, and `DATABASE_URL` has to match them (for example `postgres://<user>:<password>@localhost:5432/<db>`). Open http://localhost:3000.
