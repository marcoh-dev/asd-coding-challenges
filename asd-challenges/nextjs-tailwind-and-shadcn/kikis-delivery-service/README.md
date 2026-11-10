# Kiki's Delivery Service (Next.js Tailwind and shadcn)

Builds on [Kiki's Delivery Service (Next.js Server vs. Client)](../../nextjs-server-vs-client/kikis-delivery-service/README.md).

> **Status: almost done.** All tasks work; the status filter is still missing the "Denied" option.

The delivery app styled with Tailwind CSS and shadcn/ui (Base UI components):

- deliveries are rendered in `Card`s, the status filter uses shadcn's `Select`, and the new delivery form uses `Input` and `Label`
- links that look like buttons use `buttonVariants` on a Next.js `<Link>`
- `components/ui/button.tsx` has a custom `brand` variant (`bg-brand`, `hover:bg-brand-muted`, tokens in `app/globals.css`)
- dark mode with `next-themes`: `ModeToggle` in the header switches between light, dark and system

## Run

```bash
cp .env.example .env
docker compose up -d
npm install
npm run dev
```

Fill in `.env` first: `docker-compose.yaml` reads the `POSTGRES_*` values, and `DATABASE_URL` has to match them. Open http://localhost:3000.
