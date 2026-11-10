import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { Pressable } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

export default function CreateCharacterButton() {
	const { theme, styles } = useTheme();
	const router = useRouter();

	return (
		<Pressable
			style={({ pressed }) => [styles.headerButton, pressed && styles.pressed]}
			onPress={() => router.push("/create")}
			accessibilityRole="button"
			accessibilityLabel="Create character"
		>
			<Plus size={24} color={theme.primary} />
		</Pressable>
	);
}
