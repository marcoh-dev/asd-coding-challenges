import { Moon, Sun } from "lucide-react-native";
import { Appearance, Pressable, StyleSheet, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

export default function ThemeToggle() {
	const { theme, isDark } = useAppTheme();
	const Icon = isDark ? Sun : Moon;

	return (
		<Pressable
			style={styles.button}
			onPress={() => Appearance.setColorScheme(isDark ? "light" : "dark")}
			hitSlop={13}
			accessibilityRole="button"
			accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
		>
			{({ pressed }) => (
				<View style={pressed && styles.pressed}>
					<Icon color={theme.text} size={22} />
				</View>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		marginRight: 16,
	},
	pressed: {
		opacity: 0.7,
	},
});
