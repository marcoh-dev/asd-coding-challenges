import { Image } from "expo-image";
import { Text, View } from "react-native";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/theme/ThemeProvider";
import type { Character, CharacterStatus } from "@/types/character";

type Props = {
	character: Character;
};

export default function CharacterItem({ character }: Props) {
	const { theme, styles } = useTheme();
	const reducedMotion = useReducedMotion();

	const statusColors: Record<CharacterStatus, string> = {
		Alive: theme.statusAlive,
		Dead: theme.statusDead,
		unknown: theme.textSecondary,
	};

	return (
		<View
			style={styles.characterCard}
			accessible
			accessibilityLabel={`${character.name}, status ${character.status}, ${character.species}, gender ${character.gender}`}
		>
			<Image
				style={styles.characterImage}
				source={character.image}
				contentFit="cover"
				transition={reducedMotion ? null : 200}
			/>

			<View style={styles.characterInfo}>
				<Text style={styles.characterName} numberOfLines={2}>
					{character.name}
				</Text>

				<View style={styles.characterStatus}>
					<View
						style={[
							styles.statusDot,
							{ backgroundColor: statusColors[character.status] },
						]}
					/>
					<Text style={styles.characterDetail}>{character.status}</Text>
				</View>

				<Text style={styles.characterDetail} numberOfLines={1}>
					{character.species} · {character.gender}
				</Text>
			</View>
		</View>
	);
}
