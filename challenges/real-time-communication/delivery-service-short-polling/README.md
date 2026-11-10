# Delivery Service (Short Polling)

Task 1 of the real-time communication challenge, part one. The Express server tracks one order (`/api/orders/1`) that moves from `preparing` to `out-for-delivery` (after 8 seconds) to `delivered` (after 16 seconds). The browser client asks for the status every 3 seconds and stops once the order is delivered.

## Run

```bash
bun install
bun run dev
```

Open http://localhost:3000 and watch the network tab: most requests return the same status as the one before (the console logs "no status change").

Continued with long polling in [delivery-service-long-polling](../delivery-service-long-polling/README.md).
