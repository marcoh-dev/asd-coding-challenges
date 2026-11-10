import { ScrollView, Text, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type Props = {
	message: string;
};

export default function EnvError({ message }: Props) {
	const { styles } = useTheme();

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.envError}>
			<View style={styles.card} accessibilityRole="alert">
				<Text style={styles.cardTitle} accessibilityRole="header">
					Invalid configuration
				</Text>

				<View style={styles.paragraphs}>
					<Text style={styles.text}>
						Check the environment variables in your .env file, then reload the app.
					</Text>
					<Text style={styles.envErrorMessage}>{message}</Text>
				</View>
			</View>
		</ScrollView>
	);
}
