# Rick and Morty Gallery (Input)

A gallery app for Rick and Morty characters, built with Expo Router.

Builds on [`mobile-development-03-routing`](../../mobile-development-03-routing/rick-and-morty-gallery) and adds a character search.

## Features

- Tab navigation (Home, Gallery, Settings) with a stack on top for the character details
- Details screen with a dynamic title ("Profile: <name>") and typed route params
- Search by name through the API, debounced while typing, with a search-optimized keyboard and a clear button
- Previous results stay visible while a new search loads, and each search is cached separately
- Total number of characters from the API above the list, updated for each search
- Infinite scroll and pull-to-refresh with TanStack Query; refreshing resets the list to page 1
- Details show instantly from the list cache, then update from the API
- Offline support: requests pause without a connection, an offline notice shows, and loading continues automatically once you're back online
- 2-column grid that switches to 1 column at large font sizes
- Scroll-to-top button with a fade, and tapping the active Gallery tab scrolls to the top
- Theme setting (System / Light / Dark), saved locally with zustand and `expo-sqlite/kv-store`
- Accessibility settings for reduced motion, bold text and high contrast (System / Off / On), with a reset to defaults
- Colors meet WCAG AA, the high contrast themes meet AAA
- Screen reader labels, roles and hints throughout the app

## Tech stack

- Expo SDK 58, React Native 0.88, React 19 with the React Compiler
- TypeScript
- Expo Router with typed routes
- TanStack Query, with `expo-network` for its online status
- zustand with `expo-sqlite/kv-store` for persistence
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
├── api/          API requests, query keys and online status
├── app/          Routes (Expo Router)
│   ├── (tabs)/   Home, Gallery and Settings tabs
│   └── details/  Character details route
├── assets/       Images
├── components/   Reusable UI components
├── hooks/        Accessibility and debounce hooks
├── stores/       Persisted settings store
├── theme/        Themes, styles and ThemeProvider
└── types/        Shared TypeScript types
```

## Credits

Character data comes from the [Rick and Morty API](https://rickandmortyapi.com). Rick and Morty, its characters and logo belong to their respective owners (Adult Swim). This is a non-commercial learning project.
