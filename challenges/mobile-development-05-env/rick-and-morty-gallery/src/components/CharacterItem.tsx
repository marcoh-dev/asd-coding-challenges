import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Trash2 } from "lucide-react-native";
import { Keyboard, Pressable, Text, View } from "react-native";

import CharacterStatus from "@/components/CharacterStatus";
import { useDeleteCharacter } from "@/hooks/useDeleteCharacter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/theme/ThemeProvider";
import type { Character } from "@/types/character";

type Props = {
	character: Character;
};

export default function CharacterItem({ character }: Props) {
	const { theme, styles } = useTheme();
	const reducedMotion = useReducedMotion();
	const router = useRouter();
	const confirmDelete = useDeleteCharacter();

	return (
		<Pressable
			style={({ pressed }) => [styles.characterCard, pressed && styles.pressed]}
			unstable_pressDelay={150}
			onPress={() => {
				Keyboard.dismiss();
				router.push({ pathname: "/details/[id]", params: { id: character.id } });
			}}
			accessibilityRole="button"
			accessibilityLabel={`${character.name}, status ${character.status}, ${character.species}, gender ${character.gender}`}
			accessibilityHint="Opens the profile"
			accessibilityActions={[{ name: "delete", label: "Delete" }]}
			onAccessibilityAction={({ nativeEvent }) => {
				if (nativeEvent.actionName === "delete") {
					confirmDelete(character);
				}
			}}
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

				<View style={styles.characterActions}>
					<Pressable
						style={({ pressed }) => [
							styles.characterActionButton,
							pressed && styles.pressed,
						]}
						onPress={() => confirmDelete(character)}
						accessibilityRole="button"
						accessibilityLabel={`Delete ${character.name}`}
					>
						<Trash2 size={20} color={theme.statusDead} />
					</Pressable>
				</View>
			</View>
		</Pressable>
	);
}
