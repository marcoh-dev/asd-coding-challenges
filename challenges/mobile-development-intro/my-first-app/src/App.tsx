import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Header from "./components/Header";
import InputList from "./components/InputList";
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
				<Header title="My First App" onMenuPress={() => setMenuVisible(true)} />

				<Menu visible={menuVisible} onClose={() => setMenuVisible(false)} />

				<ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
					<View style={styles.card}>
						<Text style={styles.cardTitle}>Welcome</Text>

						<Text style={styles.text}>Hello World!</Text>
					</View>

					<View style={styles.card}>
						<Text style={styles.cardTitle}>My Input List</Text>

						<InputList />
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
