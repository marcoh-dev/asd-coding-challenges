import { ActivityIndicator, Pressable, Text } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type Props = {
	label: string;
	accessibilityLabel: string;
	isBusy: boolean;
	onPress: () => void;
};

export default function HeaderTextButton({ label, accessibilityLabel, isBusy, onPress }: Props) {
	const { theme, styles } = useTheme();

	return (
		<Pressable
			style={({ pressed }) => [styles.headerTextButton, pressed && styles.pressed]}
			onPress={onPress}
			hitSlop={6}
			disabled={isBusy}
			accessibilityRole="button"
			accessibilityLabel={accessibilityLabel}
			accessibilityState={{ busy: isBusy, disabled: isBusy }}
		>
			{isBusy ? (
				<ActivityIndicator color={theme.primary} />
			) : (
				<Text style={styles.headerTextButtonText}>{label}</Text>
			)}
		</Pressable>
	);
}
