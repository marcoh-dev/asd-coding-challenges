import { createContext, type ReactNode, use, useMemo } from "react";
import { useColorScheme } from "react-native";

import { useSettingsStore } from "@/stores/settingsStore";

import { createStyles } from "./createStyles";
import { type AppTheme, darkTheme, lightTheme } from "./themes";

type ThemeContextValue = {
	theme: AppTheme;
	styles: ReturnType<typeof createStyles>;
	isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const systemColorScheme = useColorScheme();
	const themeMode = useSettingsStore((state) => state.themeMode);

	const isDark = themeMode === "system" ? systemColorScheme === "dark" : themeMode === "dark";

	const value = useMemo(() => {
		const theme = isDark ? darkTheme : lightTheme;
		return { theme, styles: createStyles(theme), isDark };
	}, [isDark]);

	return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
	const context = use(ThemeContext);
	if (!context) throw new Error("useTheme must be used inside ThemeProvider");
	return context;
}
