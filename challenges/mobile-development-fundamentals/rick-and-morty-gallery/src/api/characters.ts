import type { Character } from "@/types/character";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export type CharacterPage = {
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: Character[];
};

export async function fetchCharacters({
	pageParam,
	signal,
}: {
	pageParam: number;
	signal: AbortSignal;
}): Promise<CharacterPage> {
	if (!API_URL) {
		throw new Error("EXPO_PUBLIC_API_URL is not set");
	}

	const response = await fetch(`${API_URL}/character?page=${pageParam}`, { signal });

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}

	return response.json();
}
