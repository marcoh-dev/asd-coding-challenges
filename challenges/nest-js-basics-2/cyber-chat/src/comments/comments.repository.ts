import { Injectable } from "@nestjs/common";
import type { Comment, CommentPayload } from "./comments.type";
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
		// return this.comments.get(id)
		return this.comments.get(id)
			? this.comments.get(id)?.body !== "deleted"
				? this.comments.get(id)
				: undefined
			: undefined;
	}

	create(threadId: number, data: CommentPayload): Comment {
		const newId = Math.max(...this.comments.keys()) + 1;
		const comment: Comment = { id: newId, threadId, createdAt: new Date(), ...data };
		this.comments.set(comment.id, comment);
		return comment;
	}

	deleteById(id: number): boolean {
		// return this.comments.delete(id);
		const comment = this.findById(id);

		if (!comment || comment.body === "deleted") return false;

		comment.body = "deleted";

		return true;
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
