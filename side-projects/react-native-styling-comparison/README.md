# React Native Styling Comparison

The same character list styled in four different ways, one tab per approach, so the implementations can be compared side by side.

Based on [`mobile-development-05-env/rick-and-morty-gallery`](../../fssd-challenges/mobile-development-05-env/rick-and-morty-gallery), trimmed down to one screen: the first page of characters from the [Rick and Morty API](https://rickandmortyapi.com), in two columns, with light and dark mode following the system.

## Approaches

Each approach has its own folder in `src/styles/` with the same two components: `CharacterScreen` (list, loading and error state) and `CharacterCard`.

| Tab        | Folder                  |
| ---------- | ----------------------- |
| StyleSheet | `src/styles/stylesheet` |

## Getting started

```bash
pnpm install
pnpm start
```

## Scripts

```bash
pnpm start    # start the dev server
pnpm check    # lint + format check + typecheck
```
