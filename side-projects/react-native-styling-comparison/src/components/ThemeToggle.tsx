import { Moon, Sun } from "lucide-react-native";
import { Appearance, Pressable, StyleSheet } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

export default function ThemeToggle() {
	const { theme, isDark } = useAppTheme();
	const Icon = isDark ? Sun : Moon;

	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			onPress={() => Appearance.setColorScheme(isDark ? "light" : "dark")}
			accessibilityRole="button"
			accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
		>
			<Icon color={theme.text} size={22} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 48,
		height: 48,
		marginRight: 4,
		alignItems: "center",
		justifyContent: "center",
	},
	pressed: {
		opacity: 0.7,
	},
});
