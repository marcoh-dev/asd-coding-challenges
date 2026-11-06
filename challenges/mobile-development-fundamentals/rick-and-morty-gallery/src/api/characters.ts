import type { Character } from "@/types/character";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type CharacterResponse = {
	results: Character[];
};

export async function fetchCharacters({ signal }: { signal: AbortSignal }) {
	if (!API_URL) {
		throw new Error("EXPO_PUBLIC_API_URL is not set");
	}

	const response = await fetch(`${API_URL}/character`, { signal });

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}

	const data: CharacterResponse = await response.json();
	return data.results;
}
