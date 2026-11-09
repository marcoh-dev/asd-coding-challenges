import { Pressable, Text } from "react-native";

import { useAnnouncement } from "@/hooks/useAnnouncement";
import { useTheme } from "@/theme/ThemeProvider";

type Props = {
	message: string;
	onRetry?: () => void;
};

export default function ErrorMessage({ message, onRetry }: Props) {
	const { styles } = useTheme();

	useAnnouncement(message);

	return (
		<>
			<Text style={styles.text} accessibilityRole="alert">
				{message}
			</Text>

			{onRetry && (
				<Pressable style={styles.button} onPress={onRetry} accessibilityRole="button">
					<Text style={styles.buttonText}>Try again</Text>
				</Pressable>
			)}
		</>
	);
}
