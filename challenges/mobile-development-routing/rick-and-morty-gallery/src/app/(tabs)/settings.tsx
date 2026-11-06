import { Moon, Pause, Play, Smartphone, Sun } from "lucide-react-native";
import { Text, View } from "react-native";

import OptionSelector from "@/components/OptionSelector";
import { useSettingsStore } from "@/stores/settingsStore";
import { useTheme } from "@/theme/ThemeProvider";

const themeOptions = [
	{ value: "system", label: "System", Icon: Smartphone },
	{ value: "light", label: "Light", Icon: Sun },
	{ value: "dark", label: "Dark", Icon: Moon },
] as const;

const reducedMotionOptions = [
	{ value: "system", label: "System", Icon: Smartphone },
	{ value: "on", label: "On", Icon: Pause },
	{ value: "off", label: "Off", Icon: Play },
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
