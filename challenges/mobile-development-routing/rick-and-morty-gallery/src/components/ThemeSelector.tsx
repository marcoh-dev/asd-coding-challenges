import { Moon, Smartphone, Sun } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { useSettingsStore } from "@/stores/settingsStore";
import { useTheme } from "@/theme/ThemeProvider";

const themeOptions = [
	{ mode: "system", label: "System", Icon: Smartphone },
	{ mode: "light", label: "Light", Icon: Sun },
	{ mode: "dark", label: "Dark", Icon: Moon },
] as const;

export default function ThemeSelector() {
	const { theme, styles } = useTheme();
	const themeMode = useSettingsStore((state) => state.themeMode);
	const setThemeMode = useSettingsStore((state) => state.setThemeMode);

	return (
		<View
			style={styles.themeSelector}
			accessibilityRole="radiogroup"
			accessibilityLabel="Theme"
		>
			{themeOptions.map(({ mode, label, Icon }) => (
				<Pressable
					key={mode}
					onPress={() => setThemeMode(mode)}
					accessibilityRole="radio"
					accessibilityLabel={label}
					accessibilityState={{ checked: themeMode === mode }}
					style={[
						styles.themeButton,
						{ backgroundColor: themeMode === mode ? theme.primary : "transparent" },
					]}
				>
					<Icon size={22} color={themeMode === mode ? theme.background : theme.text} />
				</Pressable>
			))}
		</View>
	);
}
