import { Moon, Smartphone, Sun } from "lucide-react-native";
import { Text, View } from "react-native";

import OptionSelector from "@/components/OptionSelector";
import { useSettingsStore } from "@/stores/settingsStore";
import { useTheme } from "@/theme/ThemeProvider";

const themeOptions = [
	{ value: "system", label: "System", Icon: Smartphone },
	{ value: "light", label: "Light", Icon: Sun },
	{ value: "dark", label: "Dark", Icon: Moon },
] as const;

export default function Settings() {
	const { styles } = useTheme();
	const themeMode = useSettingsStore((state) => state.themeMode);
	const setThemeMode = useSettingsStore((state) => state.setThemeMode);

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
		</View>
	);
}
