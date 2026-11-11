import { defaultConfig } from "@tamagui/config/v6";
import { createTamagui } from "tamagui";

import { darkTheme, lightTheme } from "@/theme/themes";

export const tamaguiConfig = createTamagui({
	...defaultConfig,
	themes: {
		light: { ...defaultConfig.themes.light, ...lightTheme },
		dark: { ...defaultConfig.themes.dark, ...darkTheme },
	},
});

type TamaguiConfig = typeof tamaguiConfig;

declare module "tamagui" {
	interface TamaguiCustomConfig extends TamaguiConfig {}
}
