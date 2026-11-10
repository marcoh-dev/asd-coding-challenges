# Kiki's Delivery Service (Next.js App Router)

A code-along that builds a delivery request app one route at a time with the Next.js App Router. The delivery requests come from a mock service in `lib/services/deliveriesService.ts`.

- `/` shows the first delivery request
- `/deliveries` lists all requests with pickup, destination and status
- `/deliveries/[id]` shows one request (`params` is awaited), with `loading.tsx`, `error.tsx` and `not-found.tsx` in the `deliveries` segment
- The root layout has a header with the title in the Cherry Bomb One font (`next/font/google`)

## Run

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.
