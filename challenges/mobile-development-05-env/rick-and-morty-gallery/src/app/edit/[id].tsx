import {
	type InfiniteData,
	onlineManager,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AccessibilityInfo, Alert } from "react-native";

import {
	type CharacterPage,
	characterQueryKey,
	CHARACTERS_QUERY_KEY,
	updateCharacter,
} from "@/api/characters";
import CharacterFallback from "@/components/CharacterFallback";
import CharacterForm from "@/components/CharacterForm";
import { useCharacter } from "@/hooks/useCharacter";
import { toCharacterForm } from "@/schemas/characterForm";
import type { CharacterInput } from "@/types/character";

export default function EditCharacter() {
	const { id } = useLocalSearchParams<"/edit/[id]">();
	const router = useRouter();
	const queryClient = useQueryClient();
	const query = useCharacter(id);
	const character = query.data;

	const { mutate, isPending } = useMutation({
		mutationFn: (input: CharacterInput) => updateCharacter(Number(id), input),
		onSuccess: (updated) => {
			queryClient.setQueryData(characterQueryKey(updated.id), updated);
			queryClient.setQueriesData<InfiniteData<CharacterPage, number>>(
				{ queryKey: CHARACTERS_QUERY_KEY },
				(data) =>
					data && {
						...data,
						pages: data.pages.map((page) => ({
							...page,
							results: page.results.map((result) =>
								result.id === updated.id ? updated : result,
							),
						})),
					},
			);
			void queryClient.invalidateQueries({ queryKey: CHARACTERS_QUERY_KEY });
			AccessibilityInfo.announceForAccessibility(`${updated.name} saved`);
		},
		onError: () => {
			Alert.alert("Could not save", "Your changes could not be saved. Please try again.");
		},
	});

	function submit(input: CharacterInput, allowLeave: () => void) {
		if (!onlineManager.isOnline()) {
			Alert.alert("You’re offline", "Changes can be saved as soon as you’re back online.");
			return;
		}

		mutate(input, {
			onSuccess: () => {
				allowLeave();
				router.back();
			},
		});
	}

	if (!character) {
		return <CharacterFallback query={query} />;
	}

	return (
		<CharacterForm
			key={character.id}
			defaultValues={toCharacterForm(character)}
			submitLabel="Save"
			submitAccessibilityLabel="Save changes"
			isSubmitting={isPending}
			onSubmit={submit}
		/>
	);
}
