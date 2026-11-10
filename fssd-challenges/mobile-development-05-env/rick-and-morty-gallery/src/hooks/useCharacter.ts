import { type InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";

import {
	type CharacterPage,
	characterQueryKey,
	CHARACTERS_QUERY_KEY,
	fetchCharacter,
} from "@/api/characters";
import type { Character } from "@/types/character";

export function useCharacter(id: string) {
	const queryClient = useQueryClient();

	return useQuery<Character>({
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
}
