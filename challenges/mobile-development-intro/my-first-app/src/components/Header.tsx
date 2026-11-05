import { Menu } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { createStyles } from "@/theme/createStyles";
import type { AppTheme } from "@/theme/themes";

type Props = {
	title: string;
	onMenuPress: () => void;
	theme: AppTheme;
};

export default function Header({ title, onMenuPress, theme }: Props) {
	const styles = createStyles(theme);

	return (
		<View style={styles.header}>
			<Text style={styles.headerTitle}>{title}</Text>

			<Pressable onPress={onMenuPress}>
				<Menu size={26} color={theme.text} />
			</Pressable>
		</View>
	);
}
