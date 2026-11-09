import { useRouter } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import { Pressable } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type Props = {
	icon: LucideIcon;
	accessibilityLabel: string;
};

export default function HeaderLeftButton({ icon: Icon, accessibilityLabel }: Props) {
	const { theme, styles } = useTheme();
	const router = useRouter();

	function goBack() {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.replace("/gallery");
		}
	}

	return (
		<Pressable
			style={({ pressed }) => [styles.headerLeftButton, pressed && styles.pressed]}
			onPress={goBack}
			accessibilityRole="button"
			accessibilityLabel={accessibilityLabel}
		>
			<Icon size={24} color={theme.text} />
		</Pressable>
	);
}
