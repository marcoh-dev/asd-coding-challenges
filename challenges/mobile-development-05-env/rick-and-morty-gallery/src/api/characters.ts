import { getEnv } from "@/env";
import type { Character, CharacterInput } from "@/types/character";

export const CHARACTERS_QUERY_KEY = ["characters"];

export function charactersQueryKey(name: string) {
	return [...CHARACTERS_QUERY_KEY, name];
}

export function characterQueryKey(id: number | string) {
	return ["character", String(id)];
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

async function send(path: string, init?: RequestInit) {
	const response = await fetch(`${getEnv().EXPO_PUBLIC_API_URL}${path}`, init);

	if (!response.ok) {
		throw new RequestError(response.status);
	}

	return response;
}

async function request<TData>(path: string, signal: AbortSignal): Promise<TData> {
	const response = await send(path, { signal });

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

export async function deleteCharacter(id: number) {
	await send(`/characters/${id}`, { method: "DELETE" });
}

export async function createCharacter(input: CharacterInput): Promise<Character> {
	const response = await send("/characters", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(input),
	});

	return response.json();
}
