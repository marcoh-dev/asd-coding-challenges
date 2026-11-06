import { ArrowUp } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Animated, Pressable } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

const FADE_DURATION = 200;

type Props = {
	visible: boolean;
	onPress: () => void;
};

export default function ScrollTopButton({ visible, onPress }: Props) {
	const { theme, styles } = useTheme();
	const [opacity] = useState(() => new Animated.Value(0));
	const [mounted, setMounted] = useState(visible);

	if (visible && !mounted) {
		setMounted(true);
	}

	useEffect(() => {
		const animation = Animated.timing(opacity, {
			toValue: visible ? 1 : 0,
			duration: FADE_DURATION,
			useNativeDriver: true,
		});

		animation.start(({ finished }) => {
			if (finished && !visible) {
				setMounted(false);
			}
		});

		return () => animation.stop();
	}, [visible, opacity]);

	if (!mounted) {
		return null;
	}

	return (
		<Animated.View
			style={[styles.scrollTopButton, { opacity, pointerEvents: visible ? "auto" : "none" }]}
		>
			<Pressable
				style={({ pressed }) => [styles.scrollTopPressable, pressed && styles.pressed]}
				onPress={onPress}
				accessibilityRole="button"
				accessibilityLabel="Scroll to top"
			>
				<ArrowUp size={24} color={theme.background} />
			</Pressable>
		</Animated.View>
	);
}
