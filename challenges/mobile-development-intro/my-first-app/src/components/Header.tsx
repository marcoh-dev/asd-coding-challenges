import { Menu } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type Props = {
	title: string;
	onMenuPress: () => void;
};

export default function Header({ title, onMenuPress }: Props) {
	const { theme, styles } = useTheme();

	return (
		<View style={styles.header}>
			<Text style={styles.headerTitle}>{title}</Text>

			<Pressable onPress={onMenuPress}>
				<Menu size={26} color={theme.text} />
			</Pressable>
		</View>
	);
}
