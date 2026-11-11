import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkTheme, DefaultTheme, Tabs, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Boxes, Layers, Paintbrush, Wind } from "lucide-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useAppTheme } from "@/hooks/useAppTheme";
import "@/global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
	const { theme, isDark } = useAppTheme();
	const baseTheme = isDark ? DarkTheme : DefaultTheme;

	const navigationTheme = {
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

	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<ThemeProvider value={navigationTheme}>
					<StatusBar style={isDark ? "light" : "dark"} />

					<Tabs>
						<Tabs.Screen
							name="index"
							options={{
								title: "StyleSheet",
								tabBarIcon: ({ color, size }) => (
									<Layers color={color} size={size} />
								),
							}}
						/>
						<Tabs.Screen
							name="nativewind"
							options={{
								title: "NativeWind",
								tabBarIcon: ({ color, size }) => <Wind color={color} size={size} />,
							}}
						/>
						<Tabs.Screen
							name="styled-components"
							options={{
								title: "styled-components",
								tabBarIcon: ({ color, size }) => (
									<Paintbrush color={color} size={size} />
								),
							}}
						/>
						<Tabs.Screen
							name="tamagui"
							options={{
								title: "Tamagui",
								tabBarIcon: ({ color, size }) => (
									<Boxes color={color} size={size} />
								),
							}}
						/>
					</Tabs>
				</ThemeProvider>
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
