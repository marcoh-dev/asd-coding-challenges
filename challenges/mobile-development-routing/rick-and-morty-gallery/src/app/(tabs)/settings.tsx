import { Platform, Pressable, ScrollView, Text, View } from "react-native";

import OptionSelector from "@/components/OptionSelector";
import { defaultSettings, useSettingsStore } from "@/stores/settingsStore";
import { useTheme } from "@/theme/ThemeProvider";

const themeOptions = [
	{ value: "system", label: "System" },
	{ value: "light", label: "Light" },
	{ value: "dark", label: "Dark" },
] as const;

const accessibilityOptions = [
	{ value: "system", label: "System" },
	{ value: "on", label: "On" },
	{ value: "off", label: "Off" },
] as const;

const boldTextOptions = accessibilityOptions.map((option) => ({
	...option,
	disabled: option.value === "system" && Platform.OS !== "ios",
}));

const settingKeys = Object.keys(defaultSettings) as (keyof typeof defaultSettings)[];

export default function Settings() {
	const { styles } = useTheme();
	const themeMode = useSettingsStore((state) => state.themeMode);
	const setThemeMode = useSettingsStore((state) => state.setThemeMode);
	const reducedMotion = useSettingsStore((state) => state.reducedMotion);
	const setReducedMotion = useSettingsStore((state) => state.setReducedMotion);
	const boldText = useSettingsStore((state) => state.boldText);
	const setBoldText = useSettingsStore((state) => state.setBoldText);
	const highContrast = useSettingsStore((state) => state.highContrast);
	const setHighContrast = useSettingsStore((state) => state.setHighContrast);
	const resetSettings = useSettingsStore((state) => state.resetSettings);

	const isDefault = useSettingsStore((state) =>
		settingKeys.every((key) => state[key] === defaultSettings[key]),
	);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.cardTitle} accessibilityRole="header">
					Appearance
				</Text>

				<Text style={styles.text}>Theme</Text>

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

				<View style={styles.settingGroups}>
					<View>
						<Text style={styles.text}>Reduce motion</Text>

						<OptionSelector
							options={accessibilityOptions}
							value={reducedMotion}
							onChange={setReducedMotion}
							accessibilityLabel="Reduce motion"
						/>
					</View>

					<View>
						<Text style={styles.text}>Bold text</Text>

						<OptionSelector
							options={boldTextOptions}
							value={boldText}
							onChange={setBoldText}
							accessibilityLabel="Bold text"
						/>
					</View>

					<View>
						<Text style={styles.text}>High contrast</Text>

						<OptionSelector
							options={accessibilityOptions}
							value={highContrast}
							onChange={setHighContrast}
							accessibilityLabel="High contrast"
						/>
					</View>
				</View>
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
				accessibilityHint="Sets all settings back to their defaults"
			>
				<Text style={[styles.resetButtonText, isDefault && styles.resetButtonTextDisabled]}>
					Reset to defaults
				</Text>
			</Pressable>
		</ScrollView>
	);
}
