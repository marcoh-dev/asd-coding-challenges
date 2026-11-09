import { createContext, type ReactNode, use, useEffect, useMemo } from "react";
import { Appearance, useColorScheme } from "react-native";

import { useBoldText } from "@/hooks/useBoldText";
import { useHighContrast } from "@/hooks/useHighContrast";
import { useSettingsStore } from "@/stores/settingsStore";

import { createStyles } from "./createStyles";
import {
	type AppTheme,
	darkTheme,
	highContrastDarkTheme,
	highContrastLightTheme,
	lightTheme,
} from "./themes";

type ThemeContextValue = {
	theme: AppTheme;
	styles: ReturnType<typeof createStyles>;
	isDark: boolean;
	boldText: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const systemColorScheme = useColorScheme();
	const themeMode = useSettingsStore((state) => state.themeMode);
	const boldText = useBoldText();
	const highContrast = useHighContrast();

	const isDark = themeMode === "system" ? systemColorScheme === "dark" : themeMode === "dark";

	useEffect(() => {
		Appearance.setColorScheme(themeMode === "system" ? "auto" : themeMode);
	}, [themeMode]);

	const value = useMemo(() => {
		const theme = highContrast
			? isDark
				? highContrastDarkTheme
				: highContrastLightTheme
			: isDark
				? darkTheme
				: lightTheme;

		return { theme, styles: createStyles(theme, boldText), isDark, boldText };
	}, [isDark, boldText, highContrast]);

	return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
	const context = use(ThemeContext);
	if (!context) throw new Error("useTheme must be used inside ThemeProvider");
	return context;
}
