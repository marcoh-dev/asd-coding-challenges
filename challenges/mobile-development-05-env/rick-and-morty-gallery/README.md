# Rick and Morty Gallery (Env)

A gallery app for Rick and Morty characters, built with Expo Router.

Builds on [`mobile-development-04-input`](../../mobile-development-04-input/rick-and-morty-gallery).

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
- [Character backend](../character-backend) (NestJS, SQLite) as the API
- expo-image, lucide-react-native
- ESLint, Prettier and GitHub Actions CI

## Getting started

The app gets its data from the [character backend](../character-backend), which runs on your computer. Your phone and your computer need to be on the same Wi-Fi.

1. Start the backend (details in [its README](../character-backend#getting-started)):

    ```bash
    cd ../character-backend
    npm install
    npm run start:dev
    ```

2. Find your computer's local IP address. It usually looks like `192.168.x.x` or `10.x.x.x`.
    - macOS: `ipconfig getifaddr en0`, or look for `inet` under `en0` in `ifconfig`
    - Windows: `ipconfig`, the IPv4 address of your Wi-Fi or Ethernet adapter

3. Create `.env` and set the API URL to that address:

    ```bash
    cp .env.example .env
    ```

    ```bash
    EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP_ADDRESS>:3000/api
    ```

4. Install and start the app:

    ```bash
    npm install
    npx expo start
    ```

`localhost` doesn't work here: on the phone it means the phone itself, not your computer. If your IP address changes (for example on another Wi-Fi), update `.env` and reload the app. If the app can't reach the backend, check that your firewall allows incoming connections for Node.

Run lint, format check and typecheck with:

```bash
npm run check
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

Character data is seeded from the [Rick and Morty API](https://rickandmortyapi.com). Rick and Morty, its characters and logo belong to their respective owners (Adult Swim). This is a non-commercial learning project.
