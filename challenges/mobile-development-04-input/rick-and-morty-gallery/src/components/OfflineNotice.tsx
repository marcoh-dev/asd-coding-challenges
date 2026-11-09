import { WifiOff } from "lucide-react-native";
import { type StyleProp, Text, View, type ViewStyle } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type Props = {
	message: string;
	style?: StyleProp<ViewStyle>;
};

export default function OfflineNotice({ message, style }: Props) {
	const { theme, styles } = useTheme();

	return (
		<View
			style={[styles.offlineNotice, style]}
			accessible
			accessibilityRole="alert"
			accessibilityLabel={`You’re offline. ${message}`}
		>
			<WifiOff size={24} color={theme.primary} />

			<View style={styles.offlineNoticeText}>
				<Text style={styles.offlineNoticeTitle}>You’re offline</Text>
				<Text style={styles.characterDetail}>{message}</Text>
			</View>
		</View>
	);
}
