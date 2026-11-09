import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { Pressable } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

export default function CancelButton() {
	const { theme, styles } = useTheme();
	const router = useRouter();

	return (
		<Pressable
			style={({ pressed }) => [styles.headerCancelButton, pressed && styles.pressed]}
			onPress={() => router.back()}
			accessibilityRole="button"
			accessibilityLabel="Cancel"
		>
			<X size={24} color={theme.text} />
		</Pressable>
	);
}
