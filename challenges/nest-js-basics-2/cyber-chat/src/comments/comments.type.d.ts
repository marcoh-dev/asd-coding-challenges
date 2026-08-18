export type Comment = {
	id: number;
	threadId: number;
	author: string;
	body: string;
	createdAt: Date;
};

export type CommentPayload = Pick<Comment, "author" | "body">;
