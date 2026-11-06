import { Moon, Smartphone, Sun, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Animated, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DRAWER_WIDTH } from "@/theme/createStyles";
import { useTheme } from "@/theme/ThemeProvider";

const ANIMATION_DURATION = 250;

type Props = {
	visible: boolean;
	onClose: () => void;
};

export default function Menu({ visible, onClose }: Props) {
	const { theme, styles, themeMode, setThemeMode } = useTheme();
	const [progress] = useState(() => new Animated.Value(0));
	const [mounted, setMounted] = useState(visible);
	const reducedMotion = useReducedMotion();

	if (visible && !mounted) {
		setMounted(true);
	}

	useEffect(() => {
		const animation = Animated.timing(progress, {
			toValue: visible ? 1 : 0,
			duration: ANIMATION_DURATION,
			useNativeDriver: true,
		});

		animation.start(({ finished }) => {
			if (finished && !visible) {
				setMounted(false);
			}
		});

		return () => animation.stop();
	}, [visible, progress]);

	const drawerAnimation = reducedMotion
		? { opacity: progress }
		: {
				transform: [
					{
						translateX: progress.interpolate({
							inputRange: [0, 1],
							outputRange: [DRAWER_WIDTH, 0],
						}),
					},
				],
			};

	const themeOptions = [
		{ mode: "system", label: "System", Icon: Smartphone },
		{ mode: "light", label: "Light", Icon: Sun },
		{ mode: "dark", label: "Dark", Icon: Moon },
	] as const;

	return (
		<Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
			<View style={styles.drawerOverlay}>
				<Animated.View style={[styles.drawerBackdrop, { opacity: progress }]}>
					<Pressable
						style={StyleSheet.absoluteFill}
						onPress={onClose}
						accessible={false}
						importantForAccessibility="no"
					/>
				</Animated.View>

				<Animated.View style={[styles.drawer, drawerAnimation]}>
					<SafeAreaView edges={["top", "bottom"]}>
						<View style={styles.drawerHeader}>
							<Text style={styles.drawerTitle} accessibilityRole="header">
								Menu
							</Text>

							<Pressable
								onPress={onClose}
								accessibilityRole="button"
								accessibilityLabel="Close menu"
								hitSlop={10}
							>
								<X size={24} color={theme.text} />
							</Pressable>
						</View>

						<Text style={styles.menuItemText} accessibilityRole="header">
							Appearance
						</Text>

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
				</Animated.View>
			</View>
		</Modal>
	);
}
