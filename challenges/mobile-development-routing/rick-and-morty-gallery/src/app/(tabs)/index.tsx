import { Text, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

export default function Home() {
	const { styles } = useTheme();

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.cardTitle} accessibilityRole="header">
					Welcome
				</Text>

				<Text style={styles.text}>
					Browse all characters from Rick and Morty in the gallery.
				</Text>
			</View>
		</View>
	);
}
