export interface IPost {
	title: string;
	image: string;
	author: string;
	createdAt: number;
	teaser: string;
	content: string;
}

export interface IBlogEntry {
	id?: number;
	title: string;
	teaser: string;
	author: string;
	createdAt: number;
	image: string;
	content: string;
}
