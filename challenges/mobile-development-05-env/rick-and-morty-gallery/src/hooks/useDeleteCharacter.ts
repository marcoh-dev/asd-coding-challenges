import {
	type InfiniteData,
	onlineManager,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { AccessibilityInfo, Alert } from "react-native";

import {
	type CharacterPage,
	characterQueryKey,
	CHARACTERS_QUERY_KEY,
	deleteCharacter,
	isNotFoundError,
} from "@/api/characters";
import type { Character } from "@/types/character";

type Options = {
	onDeleted?: () => void;
};

export function useDeleteCharacter({ onDeleted }: Options = {}) {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: async (character: Character) => {
			try {
				await deleteCharacter(character.id);
			} catch (error) {
				if (!isNotFoundError(error)) {
					throw error;
				}
			}
		},
		onSuccess: (_data, character) => {
			queryClient.setQueriesData<InfiniteData<CharacterPage, number>>(
				{ queryKey: CHARACTERS_QUERY_KEY },
				(data) =>
					data && {
						...data,
						pages: data.pages.map((page) => ({
							info: { ...page.info, count: page.info.count - 1 },
							results: page.results.filter(({ id }) => id !== character.id),
						})),
					},
			);
			queryClient.removeQueries({
				queryKey: characterQueryKey(character.id),
				type: "inactive",
			});
			void queryClient.invalidateQueries({ queryKey: CHARACTERS_QUERY_KEY });
			AccessibilityInfo.announceForAccessibility(`${character.name} deleted`);
			onDeleted?.();
		},
		onError: (_error, character) => {
			Alert.alert(
				"Could not delete",
				`${character.name} could not be deleted. Please try again.`,
			);
		},
	});

	return function confirmDelete(character: Character) {
		if (!onlineManager.isOnline()) {
			Alert.alert(
				"You’re offline",
				"Characters can be deleted as soon as you’re back online.",
			);
			return;
		}

		Alert.alert(`Delete ${character.name}?`, "This can’t be undone.", [
			{ text: "Cancel", style: "cancel" },
			{ text: "Delete", style: "destructive", onPress: () => mutate(character) },
		]);
	};
}
