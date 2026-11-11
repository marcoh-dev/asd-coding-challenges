import type { Character } from "@/types/character";

const API_URL = "https://rickandmortyapi.com/api/character";

type CharacterPage = {
	results: Character[];
};

export async function fetchCharacters(): Promise<Character[]> {
	const response = await fetch(API_URL);

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}

	const page = (await response.json()) as CharacterPage;
	return page.results;
}
