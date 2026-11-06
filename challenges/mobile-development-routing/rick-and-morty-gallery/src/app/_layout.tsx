import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	DarkTheme,
	DefaultTheme,
	Stack,
	ThemeProvider as NavigationThemeProvider,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<SafeAreaProvider>
					<RootStack />
				</SafeAreaProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

function RootStack() {
	const { theme, isDark } = useTheme();

	const navigationTheme = useMemo(() => {
		const baseTheme = isDark ? DarkTheme : DefaultTheme;

		return {
			...baseTheme,
			colors: {
				...baseTheme.colors,
				primary: theme.primary,
				background: theme.background,
				card: theme.surface,
				text: theme.text,
				border: theme.border,
			},
		};
	}, [theme, isDark]);

	return (
		<NavigationThemeProvider value={navigationTheme}>
			<StatusBar style={isDark ? "light" : "dark"} />

			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</NavigationThemeProvider>
	);
}
