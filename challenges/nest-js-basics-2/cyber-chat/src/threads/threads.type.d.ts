import { Comment } from "../comments/comments.type";

export type Thread = {
	id: number;
	title: string;
	author: string;
	body: string;
	createdAt: Date;
};

export type ThreadWithComments = Thread & {
	comments: Comment[];
};

export type ThreadPayload = Pick<Thread, "title" | "body">;
