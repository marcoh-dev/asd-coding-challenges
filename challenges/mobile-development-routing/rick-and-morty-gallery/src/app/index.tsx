import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { useTheme } from "@/theme/ThemeProvider";

export default function Home() {
	const { styles } = useTheme();
	const [menuVisible, setMenuVisible] = useState(false);

	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.container}>
				<Header title="Rick and Morty Gallery" onMenuPress={() => setMenuVisible(true)} />

				<Menu visible={menuVisible} onClose={() => setMenuVisible(false)} />

				<Gallery />
			</View>
		</SafeAreaView>
	);
}
