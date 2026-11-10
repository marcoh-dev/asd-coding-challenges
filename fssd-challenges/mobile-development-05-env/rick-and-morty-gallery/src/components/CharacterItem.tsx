import { useRouter } from "expo-router";
import { Pencil, Trash2 } from "lucide-react-native";
import { Keyboard, Pressable, Text, View } from "react-native";

import ActionMenu from "@/components/ActionMenu";
import CharacterImage from "@/components/CharacterImage";
import CharacterStatus from "@/components/CharacterStatus";
import { useDeleteCharacter } from "@/hooks/useDeleteCharacter";
import { useTheme } from "@/theme/ThemeProvider";
import type { Character } from "@/types/character";

type Props = {
	character: Character;
};

export default function CharacterItem({ character }: Props) {
	const { theme, styles } = useTheme();
	const router = useRouter();
	const confirmDelete = useDeleteCharacter();

	function openEdit() {
		router.push({ pathname: "/edit/[id]", params: { id: character.id } });
	}

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
			accessibilityActions={[
				{ name: "edit", label: "Edit" },
				{ name: "delete", label: "Delete" },
			]}
			onAccessibilityAction={({ nativeEvent }) => {
				if (nativeEvent.actionName === "edit") {
					openEdit();
				}

				if (nativeEvent.actionName === "delete") {
					confirmDelete(character);
				}
			}}
		>
			<CharacterImage uri={character.image} style={styles.characterImage} iconSize={48} />

			<View style={styles.characterInfo}>
				<View style={styles.characterHeader}>
					<Text
						style={[styles.characterName, styles.characterHeaderName]}
						numberOfLines={2}
					>
						{character.name}
					</Text>

					<ActionMenu
						items={[
							{ label: "Edit", icon: Pencil, onPress: openEdit },
							{
								label: "Delete",
								icon: Trash2,
								destructive: true,
								onPress: () => confirmDelete(character),
							},
						]}
						accessibilityLabel={`More actions for ${character.name}`}
						buttonStyle={styles.characterActionButton}
						iconColor={theme.textSecondary}
					/>
				</View>

				<CharacterStatus status={character.status} />

				<Text style={styles.characterDetail} numberOfLines={1}>
					{character.species} · {character.gender}
				</Text>
			</View>
		</Pressable>
	);
}
