import { useState } from "react";
import { View, useColorScheme, Text, ScrollView } from "react-native";

import Header from "./components/Header";
import Menu from "./components/Menu";

import { lightTheme, darkTheme, ThemeMode } from "./theme/themes";

import { createStyles } from "./theme/createStyles";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InputList from "./components/InputList";
import { StatusBar } from "expo-status-bar";

export default function App() {
	const systemColorScheme = useColorScheme();

	const [themeMode, setThemeMode] = useState<ThemeMode>("system");
	const [menuVisible, setMenuVisible] = useState(false);

	const isDark = themeMode === "system" ? systemColorScheme === "dark" : themeMode === "dark";

	const theme = isDark ? darkTheme : lightTheme;
	const styles = createStyles(theme);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
				<StatusBar style={isDark ? "light" : "dark"} />

				<View style={styles.container}>
					<Header
						title="My First App"
						theme={theme}
						onMenuPress={() => setMenuVisible(true)}
					/>

					<Menu
						visible={menuVisible}
						onClose={() => setMenuVisible(false)}
						themeMode={themeMode}
						setThemeMode={setThemeMode}
						theme={theme}
					/>

					<ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
						<View style={styles.card}>
							<Text style={styles.cardTitle}>Welcome</Text>

							<Text style={styles.text}>Hello World!</Text>
						</View>

						<View style={styles.card}>
							<Text style={styles.cardTitle}>My Input List</Text>

							<InputList theme={theme} />
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
