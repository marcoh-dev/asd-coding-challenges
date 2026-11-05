import { Moon, Smartphone, Sun, X } from "lucide-react-native";
import { Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createStyles } from "@/theme/createStyles";
import type { AppTheme, ThemeMode } from "@/theme/themes";

type Props = {
	visible: boolean;
	onClose: () => void;
	themeMode: ThemeMode;
	setThemeMode: (mode: ThemeMode) => void;
	theme: AppTheme;
};

export default function Menu({ visible, onClose, themeMode, setThemeMode, theme }: Props) {
	const styles = createStyles(theme);

	const themeOptions = [
		{ mode: "system", Icon: Smartphone },
		{ mode: "light", Icon: Sun },
		{ mode: "dark", Icon: Moon },
	] as const;

	return (
		<Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
			<View style={styles.drawerOverlay}>
				<Pressable style={styles.drawerBackdrop} onPress={onClose} />

				<SafeAreaView style={styles.drawer} edges={["top", "bottom"]}>
					<View style={styles.drawerHeader}>
						<Text style={styles.drawerTitle}>Menu</Text>

						<Pressable onPress={onClose}>
							<X size={24} color={theme.text} />
						</Pressable>
					</View>

					<Text style={styles.menuItemText}>Appearance</Text>

					<View style={styles.themeSelector}>
						{themeOptions.map(({ mode, Icon }) => (
							<Pressable
								key={mode}
								onPress={() => setThemeMode(mode)}
								accessibilityRole="button"
								accessibilityLabel={`${mode} theme`}
								accessibilityState={{
									selected: themeMode === mode,
								}}
								style={[
									styles.themeButton,
									{
										backgroundColor:
											themeMode === mode ? theme.primary : "transparent",
									},
								]}
							>
								<Icon
									size={22}
									color={themeMode === mode ? theme.background : theme.text}
								/>
							</Pressable>
						))}
					</View>
				</SafeAreaView>
			</View>
		</Modal>
	);
}
