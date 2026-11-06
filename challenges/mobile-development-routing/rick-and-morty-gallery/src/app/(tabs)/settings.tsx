import { Pressable, Text, View } from "react-native";

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
	const resetSettings = useSettingsStore((state) => state.resetSettings);

	const isDefault = themeMode === "system" && reducedMotion === "system";

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

			<Pressable
				style={({ pressed }) => [
					styles.resetButton,
					pressed && styles.pressed,
					isDefault && styles.resetButtonDisabled,
				]}
				onPress={resetSettings}
				disabled={isDefault}
				accessibilityRole="button"
				accessibilityState={{ disabled: isDefault }}
				accessibilityHint="Sets all settings back to System"
			>
				<Text style={[styles.resetButtonText, isDefault && styles.resetButtonTextDisabled]}>
					Reset to defaults
				</Text>
			</Pressable>
		</View>
	);
}
