import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import CharacterItem from "./components/CharacterItem";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { ThemeProvider, useTheme } from "./theme/ThemeProvider";
import type { Character } from "./types/character";

const sampleCharacter: Character = {
	id: 1,
	name: "Rick Sanchez",
	status: "Alive",
	species: "Human",
	type: "",
	gender: "Male",
	origin: { name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1" },
	location: { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" },
	image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
	episode: ["https://rickandmortyapi.com/api/episode/1"],
	url: "https://rickandmortyapi.com/api/character/1",
	created: "2017-11-04T18:48:46.250Z",
};

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
					<View style={{ width: "100%" }}>
						<CharacterItem character={sampleCharacter} />
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
