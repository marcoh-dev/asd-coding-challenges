import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pencil, Trash2 } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

import ActionMenu from "@/components/ActionMenu";
import CharacterFallback from "@/components/CharacterFallback";
import CharacterImage from "@/components/CharacterImage";
import CharacterStatus from "@/components/CharacterStatus";
import { useCharacter } from "@/hooks/useCharacter";
import { useDeleteCharacter } from "@/hooks/useDeleteCharacter";
import { useTheme } from "@/theme/ThemeProvider";

export default function CharacterDetails() {
	const { id } = useLocalSearchParams<"/details/[id]">();
	const { theme, styles } = useTheme();
	const router = useRouter();
	const confirmDelete = useDeleteCharacter({ onDeleted: () => router.back() });

	const query = useCharacter(id);
	const character = query.data;

	const title = character ? `Profile: ${character.name}` : "Profile";

	if (!character) {
		return (
			<>
				<Stack.Screen options={{ title }} />
				<CharacterFallback query={query} />
			</>
		);
	}

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			contentContainerStyle={styles.detailsContent}
		>
			<Stack.Screen
				options={{
					title,
					headerRight: () => (
						<ActionMenu
							items={[
								{
									label: "Edit",
									icon: Pencil,
									onPress: () =>
										router.push({
											pathname: "/edit/[id]",
											params: { id: character.id },
										}),
								},
								{
									label: "Delete",
									icon: Trash2,
									destructive: true,
									onPress: () => confirmDelete(character),
								},
							]}
							accessibilityLabel={`More actions for ${character.name}`}
							buttonStyle={styles.headerButton}
							iconColor={theme.primary}
						/>
					),
				}}
			/>

			<CharacterImage
				uri={character.image}
				style={styles.detailsImage}
				iconSize={96}
				accessibilityLabel={
					character.image
						? `Picture of ${character.name}`
						: `No picture of ${character.name}`
				}
			/>

			<View style={styles.detailsHeading}>
				<Text style={styles.detailsName} accessibilityRole="header">
					{character.name}
				</Text>

				<CharacterStatus status={character.status} />
			</View>

			<View style={styles.detailsList}>
				<DetailRow label="Species" value={character.species} />
				{character.type && <DetailRow label="Type" value={character.type} />}
				<DetailRow label="Gender" value={character.gender} />
				<DetailRow label="Origin" value={character.origin.name} />
				<DetailRow label="Location" value={character.location.name} />
				<DetailRow label="Episodes" value={String(character.episode.length)} />
			</View>
		</ScrollView>
	);
}

function DetailRow({ label, value }: { label: string; value: string }) {
	const { styles } = useTheme();

	return (
		<View style={styles.detailRow} accessible accessibilityLabel={`${label}: ${value}`}>
			<Text style={styles.detailLabel}>{label}</Text>
			<Text style={styles.detailValue}>{value}</Text>
		</View>
	);
}
