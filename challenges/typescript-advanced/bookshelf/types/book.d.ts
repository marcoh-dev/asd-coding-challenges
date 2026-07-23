export type TEntityId = number | string;

type TTimestamped = {
	createdAt: Date;
	updatedAt: Date;
};

type THasId = {
	id: TEntityId;
};

type TBookFields = {
	title: string;
	author: string;
	isbn: string;
	isAvailable: boolean;
};

export type TBook = THasId & TTimestamped & TBookFields;

// group (number), publisher (string), and title identifier (string)
//export type TIsbnParts = [number, string, string];
export type TIsbnParts = [group: number, publisher: string, titleCode: string];

export type TBookCreatePayload = Omit<TBook, "id" | "createdAt" | "updatedAt">;
export type TBookUpdatePayload = Partial<TBookCreatePayload>;
export type TBookPreview = Pick<TBook, "id" | "title" | "author">;

export interface IApiResponse<T> {
	status: number;
	message: string;
	data: T;
}
