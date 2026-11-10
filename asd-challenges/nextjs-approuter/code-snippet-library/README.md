# Code Snippet Library (Next.js App Router)

A small library that keeps code snippets in one place. The snippets are stored in an array in `lib/services/snippetsService.ts`.

- `/snippets` lists all snippets with title, language and description
- `/snippets/[id]` shows one snippet with its code in `<pre><code>`, and a `not-found.tsx` for unknown IDs
- Inter is the body font and JetBrains Mono the code font (`next/font/google`); all styling lives in one `<style>` tag in the root layout

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.
