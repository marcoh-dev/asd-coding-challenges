import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { ThemeProvider, useTheme } from "./theme/ThemeProvider";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<SafeAreaProvider>
					<Home />
				</SafeAreaProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

function Home() {
	const { styles, isDark } = useTheme();
	const [menuVisible, setMenuVisible] = useState(false);

	return (
		<SafeAreaView style={styles.screen}>
			<StatusBar style={isDark ? "light" : "dark"} />

			<View style={styles.container}>
				<Header title="Rick and Morty Gallery" onMenuPress={() => setMenuVisible(true)} />

				<Menu visible={menuVisible} onClose={() => setMenuVisible(false)} />

				<Gallery />
			</View>
		</SafeAreaView>
	);
}
