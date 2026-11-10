# Rick and Morty Gallery (Fundamentals)

A gallery app for Rick and Morty characters, built with Expo and React Native.

Builds on [`mobile-development-01-intro`](../../mobile-development-01-intro/my-first-app) and replaces its input list with a character gallery.

## Features

- 2-column character grid with FlatList
- Infinite scroll and pull-to-refresh with TanStack Query; refreshing resets the list to page 1
- Loading and error states with a retry button
- Menu that slides in from the right over a fading backdrop
- Theme setting (System / Light / Dark) in the menu
- Respects the system reduce motion setting
- Screen reader labels, roles and hints

## Tech stack

- Expo SDK 58, React Native 0.88, React 19
- TypeScript
- TanStack Query
- expo-image, lucide-react-native
- ESLint, Prettier and GitHub Actions CI

## Getting started

```bash
cp .env.example .env
pnpm install
pnpm expo start
```

Run lint, format check and typecheck with:

```bash
pnpm check
```

## Project structure

```text
src/
├── api/          API requests and query keys
├── components/   Gallery, character card, header and menu
├── hooks/        Reduce motion hook
├── theme/        Themes, styles and ThemeProvider
├── types/        Shared TypeScript types
├── App.tsx       App root with providers
└── index.ts      Entry point
```

## Credits

Character data comes from the [Rick and Morty API](https://rickandmortyapi.com). Rick and Morty and its characters belong to their respective owners (Adult Swim). This is a non-commercial learning project.
