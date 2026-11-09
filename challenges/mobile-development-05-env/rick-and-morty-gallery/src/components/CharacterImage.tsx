import { Image, type ImageStyle } from "expo-image";
import { UserRound } from "lucide-react-native";
import { type StyleProp, View } from "react-native";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/theme/ThemeProvider";

type Props = {
	uri: string;
	style: StyleProp<ImageStyle>;
	iconSize: number;
	accessibilityLabel?: string;
};

export default function CharacterImage({ uri, style, iconSize, accessibilityLabel }: Props) {
	const { theme, styles } = useTheme();
	const reducedMotion = useReducedMotion();

	if (!uri) {
		return (
			<View
				style={[style, styles.imagePlaceholder]}
				accessible={Boolean(accessibilityLabel)}
				accessibilityRole="image"
				accessibilityLabel={accessibilityLabel}
			>
				<UserRound size={iconSize} color={theme.textSecondary} />
			</View>
		);
	}

	return (
		<Image
			style={style}
			source={uri}
			contentFit="cover"
			transition={reducedMotion ? null : 200}
			accessibilityLabel={accessibilityLabel}
		/>
	);
}
