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
		next: string | null;
		prev: string | null;
	};
	results: Character[];
};

const EMPTY_PAGE: CharacterPage = {
	info: { count: 0, pages: 0, next: null, prev: null },
	results: [],
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

export async function fetchCharacters(
	name: string,
	{ pageParam, signal }: { pageParam: number; signal: AbortSignal },
) {
	const nameFilter = name ? `&name=${encodeURIComponent(name)}` : "";

	try {
		return await request<CharacterPage>(`/character?page=${pageParam}${nameFilter}`, signal);
	} catch (error) {
		if (name && isNotFoundError(error)) {
			return EMPTY_PAGE;
		}

		throw error;
	}
}

export function fetchCharacter(id: string, signal: AbortSignal) {
	return request<Character>(`/character/${id}`, signal);
}
