import { Injectable } from "@nestjs/common";
import type { Comment, CommentData } from "./comments.type";
import commentsData from "../../data/comments.seed.json";

@Injectable()
export class CommentsRepository {
	private readonly comments = new Map<number, Comment>();
	constructor() {
		for (const comment of commentsData) {
			this.comments.set(comment.id, {
				...comment,
				createdAt: new Date(comment.createdAt),
			});
		}
	}

	findAll(): Comment[] {
		return [...this.comments.values()];
	}

	findAllByThread(threadId: number): Comment[] {
		return this.findAll().filter((comment) => comment.threadId === threadId);
	}

	findById(id: number): Comment | undefined {
		return this.comments.get(id);
	}

	create(data: CommentData): Comment {
		const newId = Math.max(...this.comments.keys()) + 1;
		const comment: Comment = { id: newId, createdAt: new Date(), ...data };
		this.comments.set(comment.id, comment);
		return comment;
	}

	update(id: number, data: Partial<Comment>): Comment | undefined {
		const comment = this.findById(id);

		if (!comment) return undefined;

		const updatedComment = {
			...comment,
			...data,
		};

		this.comments.set(id, updatedComment);

		return updatedComment;
	}

	deleteByThread(threadId: number): number {
		let count = 0;

		for (const [id, comment] of this.comments) {
			if (comment.threadId === threadId) {
				this.comments.delete(id);
				count++;
			}
		}

		return count;
	}
}
