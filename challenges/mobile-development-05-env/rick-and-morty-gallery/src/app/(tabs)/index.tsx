import { Image } from "expo-image";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import ExternalLink from "@/components/ExternalLink";
import { useTheme } from "@/theme/ThemeProvider";

const paragraphProps = {
	lineBreakStrategyIOS: "standard",
	textBreakStrategy: "balanced",
} as const;

export default function Home() {
	const { styles } = useTheme();

	return (
		<ScrollView style={styles.container}>
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

				<View style={styles.paragraphs}>
					<Text style={styles.text} {...paragraphProps}>
						This app lets you explore every character from the Rick and Morty universe,
						with data from your own local character backend, seeded from the public{" "}
						<ExternalLink href="https://rickandmortyapi.com">
							Rick and Morty API
						</ExternalLink>
						.
					</Text>

					<Text style={styles.text} {...paragraphProps}>
						Open the{" "}
						<Link href="/gallery" style={styles.link}>
							gallery
						</Link>{" "}
						to scroll through all characters or search them by name. More load
						automatically as you reach the end, and pulling down refreshes the list. Tap
						a character to see their profile with species, origin, current location and
						the number of episodes they appear in.
					</Text>

					<Text style={styles.text} {...paragraphProps}>
						You can switch between light and dark mode and adjust accessibility options
						in the{" "}
						<Link href="/settings" style={styles.link}>
							settings
						</Link>
						.
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}
