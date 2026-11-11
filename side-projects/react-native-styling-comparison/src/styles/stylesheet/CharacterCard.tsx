import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";
import type { AppTheme } from "@/theme/themes";
import type { Character } from "@/types/character";

type Props = {
	character: Character;
};

export default function CharacterCard({ character }: Props) {
	const { theme } = useAppTheme();
	const styles = createStyles(theme);

	const statusColor = {
		Alive: theme.statusAlive,
		Dead: theme.statusDead,
		unknown: theme.textSecondary,
	}[character.status];

	return (
		<View
			style={styles.card}
			accessible
			accessibilityLabel={`${character.name}, status ${character.status}, ${character.species}, gender ${character.gender}`}
		>
			<Image style={styles.image} source={character.image} contentFit="cover" />

			<View style={styles.info}>
				<Text style={styles.name} numberOfLines={2}>
					{character.name}
				</Text>

				<View style={styles.status}>
					<View style={[styles.statusDot, { backgroundColor: statusColor }]} />
					<Text style={styles.detail}>{character.status}</Text>
				</View>

				<Text style={styles.detail} numberOfLines={1}>
					{character.species} · {character.gender}
				</Text>
			</View>
		</View>
	);
}

function createStyles(theme: AppTheme) {
	return StyleSheet.create({
		card: {
			flex: 1,
			overflow: "hidden",
			borderWidth: 1,
			borderRadius: 12,
			borderColor: theme.border,
			backgroundColor: theme.surface,
		},
		image: {
			width: "100%",
			aspectRatio: 1,
		},
		info: {
			gap: 4,
			padding: 10,
		},
		name: {
			fontSize: 16,
			fontWeight: "600",
			color: theme.text,
		},
		status: {
			flexDirection: "row",
			alignItems: "center",
			gap: 6,
		},
		statusDot: {
			width: 8,
			height: 8,
			borderRadius: 4,
		},
		detail: {
			fontSize: 14,
			color: theme.textSecondary,
		},
	});
}
