import { Text, View } from "react-native";

import OptionSelector from "@/components/OptionSelector";
import { useSettingsStore } from "@/stores/settingsStore";
import { useTheme } from "@/theme/ThemeProvider";

const themeOptions = [
	{ value: "system", label: "System" },
	{ value: "light", label: "Light" },
	{ value: "dark", label: "Dark" },
] as const;

const reducedMotionOptions = [
	{ value: "system", label: "System" },
	{ value: "on", label: "On" },
	{ value: "off", label: "Off" },
] as const;

export default function Settings() {
	const { styles } = useTheme();
	const themeMode = useSettingsStore((state) => state.themeMode);
	const setThemeMode = useSettingsStore((state) => state.setThemeMode);
	const reducedMotion = useSettingsStore((state) => state.reducedMotion);
	const setReducedMotion = useSettingsStore((state) => state.setReducedMotion);

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.cardTitle} accessibilityRole="header">
					Appearance
				</Text>

				<OptionSelector
					options={themeOptions}
					value={themeMode}
					onChange={setThemeMode}
					accessibilityLabel="Theme"
				/>
			</View>

			<View style={styles.card}>
				<Text style={styles.cardTitle} accessibilityRole="header">
					Accessibility
				</Text>

				<Text style={styles.text}>Reduce motion</Text>

				<OptionSelector
					options={reducedMotionOptions}
					value={reducedMotion}
					onChange={setReducedMotion}
					accessibilityLabel="Reduce motion"
				/>
			</View>
		</View>
	);
}
