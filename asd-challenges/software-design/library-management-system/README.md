# Software Design Exercises

> **Status: unfinished.** 4 of 8 exercises are done and one is missing only its written answer; see the table below.

Small exercises on algorithms, OOP and design patterns. The task is in a comment in each file.

| File                                                  | Exercise                                | Status                                                           |
| ----------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------- |
| `src/big-o-reasoning.js`                              | Big O of five snippets                  | done                                                             |
| `src/insertion-sort.js`                               | Insertion sort with comparison count    | done                                                             |
| `src/book-library-reservations.ts`                    | Class with a private `#status`          | done                                                             |
| `src/summoning-circle.ts`                             | Factory pattern                         | done                                                             |
| `src/functional-transformation-in-a-service-layer.ts` | Filter and map without mutating         | code done, written answer about pure parts and side effects open |
| `src/api-request-builder.ts`                          | Builder pattern                         | started, `build()` and types don't compile yet                   |
| `src/undo-redo.ts`, `src/undo-redo.html`              | Undo/redo with two stacks               | started, only the HTML and empty click handlers                  |
| `src/book-library-notification-system.ts`             | Interface, abstract class and notifiers | not started                                                      |

## Run

```bash
pnpm install
node src/insertion-sort.js
pnpm tsx src/summoning-circle.ts
pnpm undo-redo
```

Run the other `.js` files with `node` and the `.ts` files with `pnpm tsx`. `pnpm undo-redo` starts a dev server for the undo/redo page.
