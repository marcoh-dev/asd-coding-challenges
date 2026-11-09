import type { Character } from "@/types/character";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const CHARACTERS_QUERY_KEY = ["characters"];

export function charactersQueryKey(name: string) {
	return [...CHARACTERS_QUERY_KEY, name];
}

export type CharacterPage = {
	info: {
		count: number;
		pages: number;
		next: number | null;
		prev: number | null;
	};
	results: Character[];
};

class RequestError extends Error {
	status: number;

	constructor(status: number) {
		super(`Request failed with status ${status}`);
		this.status = status;
	}
}

export function isNotFoundError(error: unknown) {
	return error instanceof RequestError && error.status === 404;
}

async function request<TData>(path: string, signal: AbortSignal): Promise<TData> {
	if (!API_URL) {
		throw new Error("EXPO_PUBLIC_API_URL is not set");
	}

	const response = await fetch(`${API_URL}${path}`, { signal });

	if (!response.ok) {
		throw new RequestError(response.status);
	}

	return response.json();
}

export function fetchCharacters(
	name: string,
	{ pageParam, signal }: { pageParam: number; signal: AbortSignal },
) {
	const nameFilter = name ? `&name=${encodeURIComponent(name)}` : "";

	return request<CharacterPage>(`/characters?page=${pageParam}${nameFilter}`, signal);
}

export function fetchCharacter(id: string, signal: AbortSignal) {
	return request<Character>(`/characters/${id}`, signal);
}
