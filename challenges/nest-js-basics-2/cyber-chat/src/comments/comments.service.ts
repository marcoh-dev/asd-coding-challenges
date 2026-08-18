import { BadRequestException, Injectable } from "@nestjs/common";
import type { Comment, CommentPayload } from "./comments.type";
import { CommentsRepository } from "./comments.repository";

@Injectable()
export class CommentsService {
	constructor(private readonly commentsRepository: CommentsRepository) {}
	getAllComments(): Comment[] {
		return this.commentsRepository.findAll();
	}

	getCommentsByThreadId(threadId: number): Comment[] {
		return this.commentsRepository.findAllByThread(threadId);
	}

	getCommentById(id: number): Comment | undefined {
		return this.commentsRepository.findById(id);
	}

	addNewComment(threadId: number, { author, body }: CommentPayload): Comment {
		if (!author || author.trim().length < 1) {
			throw new BadRequestException("Author is required");
		}

		if (!body || body.trim().length < 3) {
			throw new BadRequestException("Body is required and must be at least 3 characters");
		}

		return this.commentsRepository.create(threadId, { author, body });
	}

	deleteCommentById(id: number): boolean {
		return this.commentsRepository.deleteById(id);
	}

	deleteCommentsByThreadId(threadId: number): number {
		return this.commentsRepository.deleteByThread(threadId);
	}
}
