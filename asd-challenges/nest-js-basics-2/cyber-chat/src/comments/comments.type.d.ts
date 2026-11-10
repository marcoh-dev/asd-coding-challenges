export type Comment = {
	id: number;
	threadId: number;
	author: string;
	body: string;
	createdAt: Date;
};

export type CommentPayload = Pick<Comment, "author" | "body">;

export type CommentData = Pick<Comment, "author" | "body" | "threadId">;
