# React Native Styling Comparison

The same character list styled in four different ways, one tab per approach, so the implementations can be compared side by side.

Based on [`mobile-development-05-env/rick-and-morty-gallery`](../../fssd-challenges/mobile-development-05-env/rick-and-morty-gallery), trimmed down to one screen: the first page of characters from the [Rick and Morty API](https://rickandmortyapi.com), in two columns, with light and dark mode following the system.

## Approaches

Each approach has its own folder in `src/styles/` with the same two components: `CharacterScreen` (list, loading and error state) and `CharacterCard`. All four use the colors from `src/theme/themes.ts` and should look the same.

| Tab               | Folder                         | Version                   |
| ----------------- | ------------------------------ | ------------------------- |
| StyleSheet        | `src/styles/stylesheet`        | built into React Native   |
| NativeWind        | `src/styles/nativewind`        | 4.2 with Tailwind CSS 3.4 |
| styled-components | `src/styles/styled-components` | 6.6                       |
| Tamagui           | `src/styles/tamagui`           | 3.3, without the compiler |

The git history has one commit per approach, so each commit's diff shows exactly what that approach needed.

## Comparison

|                        | StyleSheet                                       | NativeWind                                                                | styled-components                               | Tamagui                                                          |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------- |
| Setup                  | none                                             | Babel and Metro config, `global.css`, `tailwind.config.js`, a types file  | one types file for the theme                    | `tamagui.config.ts` and a provider                               |
| Packages added         | none                                             | 6 (incl. Reanimated, Worklets, Tailwind)                                  | 1                                               | 2 (pulling in about 110 `@tamagui/*` packages)                   |
| Lines (card + screen)  | 86 + 93                                          | 52 + 54                                                                   | 78 + 90                                         | 63 + 75                                                          |
| Where styles live      | `StyleSheet.create` below the component          | `className` strings on the elements                                       | named components with CSS in template literals  | props on stacks, or `styled()` with an object                    |
| Theme and dark mode    | own `useAppTheme` hook, styles created per theme | colors in `tailwind.config.js`, every color twice (`bg-x dark:bg-x-dark`) | `ThemeProvider`, `theme` in every interpolation | themes in the config, `TamaguiProvider` switches light/dark      |
| Pressed state          | `style` function on `Pressable`                  | `active:opacity-70`                                                       | render function child, `$pressed` prop          | `opacity: { default: 1, press: 0.7 }`                            |
| Third-party components | pass `style`                                     | register with `cssInterop(Image, …)` to accept `className`                | `styled(Image)`                                 | pass `style`                                                     |
| TypeScript             | full                                             | class names are plain strings, not checked                                | theme typed by augmenting `DefaultTheme`        | typed props, theme values autocomplete (any string still passes) |
| Maintenance            | part of React Native                             | v5 in release candidate (Tailwind 4)                                      | maintenance mode since 2025, fixes only         | very active, v3 is a month old                                   |

## Things worth knowing

- **NativeWind changes the whole app:** the Babel preset sets `jsxImportSource: "nativewind"` for every file, not only its own tab. Components without `className` pass through unchanged, so the other tabs aren't affected.
- **NativeWind colors are duplicated:** `tailwind.config.js` can't import the TypeScript theme, so the colors are written there a second time.
- **NativeWind's rem is 14 px on native by default**, so `p-4` and `text-base` come out smaller than on the web. `inlineRem: 16` in `metro.config.js` makes them match the other tabs.
- **NativeWind logs "ImageBackground is deprecated"** on start, even though the app doesn't use it: `react-native-css-interop` touches React Native's `ImageBackground` when it loads ([nativewind#1881](https://github.com/nativewind/nativewind/issues/1881)). It's harmless.
- **NativeWind needs `react-native-css-interop` as a direct dependency** with pnpm, or Metro can't resolve its JSX runtime.
- **styled-components `FlatList`:** `contentContainerStyle` and `columnWrapperStyle` aren't style props, so they go through `.attrs()` as plain objects instead of CSS.
- **Tamagui 3 changed a lot compared with most tutorials:** theme values have no `$` (`backgroundColor: "surface"`), the v6 default config only allows shorthands (`p`, `px`, `items`, `justify`, `rounded`, `minH`), and `pressStyle` became a value per state (`{ default: 1, press: 0.7 }`).
- **Tamagui's compiler is left out:** everything works at runtime, and the compiler currently has an open bug with `@/` imports.

## Getting started

```bash
pnpm install
pnpm start
```

NativeWind needs Reanimated, which Expo Go includes, so the app runs in Expo Go.

## Scripts

```bash
pnpm start    # start the dev server
pnpm check    # lint + format check + typecheck
```
