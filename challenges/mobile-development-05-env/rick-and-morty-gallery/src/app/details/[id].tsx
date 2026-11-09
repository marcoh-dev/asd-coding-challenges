import { type InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Trash2 } from "lucide-react-native";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";

import {
	type CharacterPage,
	characterQueryKey,
	CHARACTERS_QUERY_KEY,
	fetchCharacter,
	isNotFoundError,
} from "@/api/characters";
import CharacterStatus from "@/components/CharacterStatus";
import ErrorMessage from "@/components/ErrorMessage";
import OfflineNotice from "@/components/OfflineNotice";
import { useDeleteCharacter } from "@/hooks/useDeleteCharacter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/theme/ThemeProvider";
import type { Character } from "@/types/character";

export default function CharacterDetails() {
	const { id } = useLocalSearchParams<"/details/[id]">();
	const { theme, styles } = useTheme();
	const queryClient = useQueryClient();
	const reducedMotion = useReducedMotion();
	const router = useRouter();
	const confirmDelete = useDeleteCharacter({ onDeleted: () => router.back() });

	const {
		data: character,
		error,
		isFetching,
		isPaused,
		refetch,
	} = useQuery<Character>({
		queryKey: characterQueryKey(id),
		queryFn: ({ signal }) => fetchCharacter(id, signal),
		placeholderData: () =>
			queryClient
				.getQueriesData<InfiniteData<CharacterPage, number>>({
					queryKey: CHARACTERS_QUERY_KEY,
				})
				.flatMap(([, data]) => data?.pages.flatMap((page) => page.results) ?? [])
				.find((cached) => String(cached.id) === id),
	});

	const title = character ? `Profile: ${character.name}` : "Profile";

	if (!character) {
		return (
			<View style={styles.centered}>
				<Stack.Screen options={{ title }} />

				{isFetching ? (
					<ActivityIndicator
						size="large"
						color={theme.primary}
						accessibilityLabel="Loading character"
					/>
				) : isPaused ? (
					<OfflineNotice
						message="This character loads as soon as you’re back online."
						style={styles.offlineNoticeCentered}
					/>
				) : isNotFoundError(error) ? (
					<ErrorMessage message="This character doesn’t exist." />
				) : (
					<ErrorMessage
						message="Could not load this character."
						onRetry={() => refetch()}
					/>
				)}
			</View>
		);
	}

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			contentContainerStyle={styles.detailsContent}
		>
			<Stack.Screen options={{ title }} />

			<Image
				style={styles.detailsImage}
				source={character.image}
				contentFit="cover"
				transition={reducedMotion ? null : 200}
				accessibilityLabel={`Picture of ${character.name}`}
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

			<View style={styles.detailsActions}>
				<Pressable
					style={({ pressed }) => [
						styles.actionButton,
						styles.dangerButton,
						pressed && styles.pressed,
					]}
					onPress={() => confirmDelete(character)}
					accessibilityRole="button"
					accessibilityLabel={`Delete ${character.name}`}
				>
					<Trash2 size={20} color={theme.statusDead} />
					<Text style={[styles.actionButtonText, styles.dangerButtonText]}>Delete</Text>
				</Pressable>
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
