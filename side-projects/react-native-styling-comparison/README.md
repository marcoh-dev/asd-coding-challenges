# React Native Styling Comparison

The same character list styled in four different ways, one tab per approach, so the implementations can be compared side by side.

Based on [`mobile-development-05-env/rick-and-morty-gallery`](../../fssd-challenges/mobile-development-05-env/rick-and-morty-gallery), trimmed down to one screen: the first page of characters from the [Rick and Morty API](https://rickandmortyapi.com), in two columns, with light and dark mode following the system. A sun/moon button in the header switches between them with `Appearance.setColorScheme`, which all four approaches pick up.

## Approaches

Each approach has its own folder in `src/styles/` with the same two components: `CharacterScreen` (list, loading and error state) and `CharacterCard`. All four use the colors from `src/theme/themes.ts` and should look the same.

| Tab               | Folder                         | Version                                     |
| ----------------- | ------------------------------ | ------------------------------------------- |
| StyleSheet        | `src/styles/stylesheet`        | built into React Native                     |
| NativeWind        | `src/styles/nativewind`        | 5.0 release candidate with Tailwind CSS 4.3 |
| styled-components | `src/styles/styled-components` | 6.6                                         |
| Tamagui           | `src/styles/tamagui`           | 3.3, without the compiler                   |

The git history has one commit per approach, so each commit's diff shows exactly what that approach needed.

## Comparison

|                        | StyleSheet                                       | NativeWind                                                                           | styled-components                               | Tamagui                                                          |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------- | ---------------------------------------------------------------- |
| Setup                  | none                                             | Metro and PostCSS config, `global.css` with the theme, a types file, a pnpm override | one types file for the theme                    | `tamagui.config.ts` and a provider                               |
| Packages added         | none                                             | 8 (incl. Reanimated, Worklets, Tailwind, PostCSS, Lightning CSS)                     | 1                                               | 2 (pulling in about 110 `@tamagui/*` packages)                   |
| Lines (card + screen)  | 86 + 93                                          | 48 + 50                                                                              | 78 + 90                                         | 63 + 75                                                          |
| Where styles live      | `StyleSheet.create` below the component          | `className` strings on the elements                                                  | named components with CSS in template literals  | props on stacks, or `styled()` with an object                    |
| Theme and dark mode    | own `useAppTheme` hook, styles created per theme | CSS variables in `global.css`, dark values in a `prefers-color-scheme` block         | `ThemeProvider`, `theme` in every interpolation | themes in the config, `TamaguiProvider` switches light/dark      |
| Pressed state          | `style` function on `Pressable`                  | `active:opacity-70`                                                                  | render function child, `$pressed` prop          | `opacity: { default: 1, press: 0.7 }`                            |
| Third-party components | pass `style`                                     | wrap with `styled(Image, { className: "style" })`                                    | `styled(Image)`                                 | pass `style`                                                     |
| TypeScript             | full                                             | class names are plain strings, not checked                                           | theme typed by augmenting `DefaultTheme`        | typed props, theme values autocomplete (any string still passes) |
| Maintenance            | part of React Native                             | v5 is a release candidate, v4 (Tailwind 3) is the stable line                        | maintenance mode since 2025, fixes only         | very active, v3 is a month old                                   |

## Things worth knowing

- **NativeWind 5 is a release candidate:** `nativewind` and `react-native-css` have to be installed as an exact pair (`5.0.0-rc.1` and `3.1.0-rc.1`), and `pnpm-workspace.yaml` pins `lightningcss` to 1.30.1 as NativeWind's docs require. The docs test Tailwind 4.1.12; 4.3 (food-swap's version) compiles to the same styles here.
- **NativeWind still wraps the whole app:** version 5 has no Babel step anymore, but Metro resolves every `react-native` import in the app to wrapped components from `react-native-css`, not only in the NativeWind tab. Pressed states therefore use a child function (`{({ pressed }) => …}`) instead of a `style` function, which version 4 dropped.
- **The theme is CSS:** `global.css` maps Tailwind colors to CSS variables (`@theme inline`) and switches them in a `@media (prefers-color-scheme: dark)` block, the same pattern as food-swap's web frontend, which uses a `.dark` class instead. NativeWind rejects `.dark` on native. The colors are a second copy of `src/theme/themes.ts`.
- **NativeWind's rem is 14 px on native by default**, so `p-4` and `text-base` come out smaller than on the web. `:root { font-size: 16px; }` in `global.css` makes them match the other tabs.
- **Tailwind's text sizes include a line height** (`text-base` is 16 px with a 24 px line), while the other approaches only set the font size. `global.css` resets the text sizes in `@theme` (`--text-*: initial`) and defines `text-sm` and `text-base` without one.
- **Third-party components** like `expo-image` need a `styled()` wrapper to accept `className`; React Native's own components, including `FlatList`'s `contentContainerClassName` and `columnWrapperClassName`, work without one.
- **Development builds log a warning** about `@expo/log-box`'s `ErrorToast.module.css`: Expo's error overlay ships CSS that NativeWind's compiler can't translate. It doesn't affect the app.
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
