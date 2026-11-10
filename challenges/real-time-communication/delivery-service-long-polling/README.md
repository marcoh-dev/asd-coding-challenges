# Delivery Service (Long Polling)

Builds on [Delivery Service (Short Polling)](../delivery-service-short-polling/README.md).

> **Status: unfinished.** The client already long-polls: it sends the last known status as `?since=` and starts the next request as soon as a response arrives. The server is still the short-polling version and answers immediately, so right now the client sends requests in a tight loop until the order is delivered. Next: keep the request open on the server until the status differs from `since` (respond `204` after a timeout), then compare the network traffic with short polling. Task 2 (World Cup live ticker with Server-Sent Events) is not started yet.

## Run

```bash
bun install
bun run dev
```

Open http://localhost:3000.
