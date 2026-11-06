import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

export default function Home() {
	const { styles } = useTheme();

	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={require("@/assets/images/rick-and-morty-logo.png")}
				contentFit="contain"
				accessibilityLabel="Rick and Morty"
			/>

			<View style={styles.card}>
				<Text style={styles.cardTitle} accessibilityRole="header">
					Welcome
				</Text>

				<Text style={styles.text}>
					Browse all characters from Rick and Morty in the{" "}
					<Link href="/gallery" style={styles.link}>
						gallery
					</Link>
					.
				</Text>
			</View>
		</View>
	);
}
