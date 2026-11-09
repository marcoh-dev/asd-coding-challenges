import type { Character } from "@/types/character";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const CHARACTERS_QUERY_KEY = ["characters"];

export type CharacterPage = {
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: Character[];
};

async function request<TData>(path: string, signal: AbortSignal): Promise<TData> {
	if (!API_URL) {
		throw new Error("EXPO_PUBLIC_API_URL is not set");
	}

	const response = await fetch(`${API_URL}${path}`, { signal });

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}

	return response.json();
}

export function fetchCharacters({ pageParam, signal }: { pageParam: number; signal: AbortSignal }) {
	return request<CharacterPage>(`/character?page=${pageParam}`, signal);
}

export function fetchCharacter(id: string, signal: AbortSignal) {
	return request<Character>(`/character/${id}`, signal);
}
