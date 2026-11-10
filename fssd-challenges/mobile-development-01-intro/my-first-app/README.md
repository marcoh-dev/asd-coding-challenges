# My First App

A first Expo and React Native app with a themed layout and a simple input list.

## Features

- Header with a menu button that opens a modal menu
- Theme setting (System / Light / Dark) in the menu
- Input list to add and delete items, with a disabled submit button for empty input
- Screen reader announcements when items are added or deleted
- Safe area handling for notches and system bars

## Tech stack

- Expo SDK 58, React Native 0.88, React 19
- TypeScript
- lucide-react-native
- ESLint, Prettier and GitHub Actions CI

## Getting started

```bash
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
├── components/   Header, menu and input list
├── theme/        Themes, styles and ThemeProvider
├── App.tsx       App root with providers
└── index.ts      Entry point
```
