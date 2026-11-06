import { Text, View } from "react-native";

import ThemeSelector from "@/components/ThemeSelector";
import { useTheme } from "@/theme/ThemeProvider";

export default function Settings() {
	const { styles } = useTheme();

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.cardTitle} accessibilityRole="header">
					Appearance
				</Text>

				<ThemeSelector />
			</View>
		</View>
	);
}
