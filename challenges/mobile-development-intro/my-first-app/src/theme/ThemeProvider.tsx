import { createContext, type ReactNode, use, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

import { createStyles } from "./createStyles";
import { type AppTheme, darkTheme, lightTheme, type ThemeMode } from "./themes";

type ThemeContextValue = {
	theme: AppTheme;
	styles: ReturnType<typeof createStyles>;
	isDark: boolean;
	themeMode: ThemeMode;
	setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const systemColorScheme = useColorScheme();
	const [themeMode, setThemeMode] = useState<ThemeMode>("system");

	const isDark = themeMode === "system" ? systemColorScheme === "dark" : themeMode === "dark";

	const value = useMemo(() => {
		const theme = isDark ? darkTheme : lightTheme;
		return { theme, styles: createStyles(theme), isDark, themeMode, setThemeMode };
	}, [isDark, themeMode]);

	return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
	const context = use(ThemeContext);
	if (!context) throw new Error("useTheme must be used inside ThemeProvider");
	return context;
}
