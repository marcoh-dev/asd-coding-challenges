import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
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
	const { isDark } = useTheme();

	return (
		<>
			<StatusBar style={isDark ? "light" : "dark"} />

			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</>
	);
}
