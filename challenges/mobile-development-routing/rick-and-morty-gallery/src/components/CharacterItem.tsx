import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import CharacterStatus from "@/components/CharacterStatus";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/theme/ThemeProvider";
import type { Character } from "@/types/character";

type Props = {
	character: Character;
};

export default function CharacterItem({ character }: Props) {
	const { styles } = useTheme();
	const reducedMotion = useReducedMotion();
	const router = useRouter();

	return (
		<Pressable
			style={({ pressed }) => [styles.characterCard, pressed && styles.pressed]}
			onPress={() => router.push({ pathname: "/details/[id]", params: { id: character.id } })}
			accessibilityRole="button"
			accessibilityLabel={`${character.name}, status ${character.status}, ${character.species}, gender ${character.gender}`}
			accessibilityHint="Opens the profile"
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

				<CharacterStatus status={character.status} />

				<Text style={styles.characterDetail} numberOfLines={1}>
					{character.species} · {character.gender}
				</Text>
			</View>
		</Pressable>
	);
}
