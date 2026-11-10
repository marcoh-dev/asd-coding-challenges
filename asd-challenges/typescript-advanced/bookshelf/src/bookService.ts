import type {
	TEntityId,
	TBook,
	TIsbnParts,
	TBookCreatePayload,
	TBookUpdatePayload,
	TBookPreview,
	IApiResponse,
} from "../types/book";

import sampleBooksData from "./assets/books.json";

export const sampleBooks: TBook[] = sampleBooksData.map((book) => ({
	...book,
	createdAt: new Date(book.createdAt),
	updatedAt: new Date(book.updatedAt),
}));

export async function fetchBooks(
	term: string,
): Promise<IApiResponse<TBookPreview[]>> {
	const response = await fetch(`https://www.dbooks.org/api/search/${term}`);
	const data: IApiResponse<TBookPreview[]> = await response.json();
	return data;
}

export async function fetchBook(id: TEntityId): Promise<IApiResponse<TBook>> {
	const response = await fetch(`https://www.dbooks.org/api/book/${id}`);
	const data: IApiResponse<TBook> = await response.json();
	return data;
}

export async function createBook(
	payload: TBookCreatePayload,
): Promise<IApiResponse<TBook>> {
	// ... submit "payload" to server
	const mockDataFromServer = {
		id: 8697689,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	return {
		status: 201,
		message: "book successfully created",
		data: {
			id: mockDataFromServer.id,
			createdAt: mockDataFromServer.createdAt,
			updatedAt: mockDataFromServer.updatedAt,
			title: payload.title,
			author: payload.author,
			isbn: payload.isbn,
			isAvailable: payload.isAvailable,
		},
	};
}

export async function updateBook(
	id: TEntityId,
	changes: TBookUpdatePayload,
): Promise<IApiResponse<TBook>> {
	// ... submit "id" and "changes" to server
	const mockDataFromServer = {
		id: 8697689,
		createdAt: new Date(),
		updatedAt: new Date(),
		title: changes.title ? changes.title : "cool book",
		author: changes.author ? changes.author : "Marco",
		isbn: changes.isbn ? changes.isbn : "489084489084",
		isAvailable: changes.isAvailable ? changes.isAvailable : false,
	};

	return {
		status: 200,
		message: "book successfully updated",
		data: {
			id: id,
			createdAt: mockDataFromServer.createdAt,
			updatedAt: mockDataFromServer.updatedAt,
			title: mockDataFromServer.title,
			author: mockDataFromServer.author,
			isbn: mockDataFromServer.isbn,
			isAvailable: mockDataFromServer.isAvailable,
		},
	};
}

export function parseIsbn(isbn: string): TIsbnParts {
	return [Number(isbn), "neuefische", "cool book"];
}

export function groupBy<T, K extends keyof T>(
	items: T[],
	key: K,
): Record<string, T[]> {
	const groups: Record<string, T[]> = {};

	for (const item of items) {
		const group = String(item[key]);

		if (Object.hasOwn(groups, group)) {
			groups[group]!.push(item);
		} else {
			groups[group] = [];
		}
	}

	return groups;
}

export function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
	const list: T[K][] = [];

	for (const item of items) {
		list.push(item[key]);
	}

	return list;
}

export function merge<T>(base: T, updates: Partial<T>): T {
	return { ...base, ...updates };
}
