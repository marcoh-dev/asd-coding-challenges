import { Text, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";
import type { CharacterStatus as Status } from "@/types/character";

type Props = {
	status: Status;
};

export default function CharacterStatus({ status }: Props) {
	const { theme, styles } = useTheme();

	const statusColors: Record<Status, string> = {
		Alive: theme.statusAlive,
		Dead: theme.statusDead,
		unknown: theme.textSecondary,
	};

	return (
		<View style={styles.characterStatus}>
			<View style={[styles.statusDot, { backgroundColor: statusColors[status] }]} />
			<Text style={styles.characterDetail}>{status}</Text>
		</View>
	);
}
