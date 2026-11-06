import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Header from "./components/Header";
import Menu from "./components/Menu";
import { ThemeProvider, useTheme } from "./theme/ThemeProvider";

export default function App() {
	return (
		<ThemeProvider>
			<SafeAreaProvider>
				<Home />
			</SafeAreaProvider>
		</ThemeProvider>
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

				<ScrollView style={styles.scrollView}>
					<View style={styles.card}>
						<Text style={styles.cardTitle} accessibilityRole="header">
							Welcome
						</Text>

						<Text style={styles.text}>Hello World!</Text>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
