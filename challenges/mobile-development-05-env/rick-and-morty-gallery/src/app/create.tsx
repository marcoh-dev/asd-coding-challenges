import { onlineManager, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { AccessibilityInfo, Alert } from "react-native";

import { characterQueryKey, CHARACTERS_QUERY_KEY, createCharacter } from "@/api/characters";
import CharacterForm from "@/components/CharacterForm";
import { emptyCharacterForm } from "@/schemas/characterForm";
import type { CharacterInput } from "@/types/character";

export default function CreateCharacter() {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: createCharacter,
		onSuccess: (character) => {
			queryClient.setQueryData(characterQueryKey(character.id), character);
			void queryClient.invalidateQueries({ queryKey: CHARACTERS_QUERY_KEY });
			AccessibilityInfo.announceForAccessibility(`${character.name} created`);
			router.replace({ pathname: "/details/[id]", params: { id: character.id } });
		},
		onError: () => {
			Alert.alert("Could not save", "The character could not be created. Please try again.");
		},
	});

	function submit(input: CharacterInput) {
		if (!onlineManager.isOnline()) {
			Alert.alert(
				"You’re offline",
				"Characters can be created as soon as you’re back online.",
			);
			return;
		}

		mutate(input);
	}

	return (
		<CharacterForm
			defaultValues={emptyCharacterForm}
			submitLabel="Create"
			submitAccessibilityLabel="Create character"
			isSubmitting={isPending}
			onSubmit={submit}
		/>
	);
}
