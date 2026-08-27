import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Not, Repository } from "typeorm";
import { CreateCommentDto } from "./dtos/createComment.dto";
import { Thread } from "../threads/entities/thread.entity";

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(Comment)
		private readonly comments: Repository<Comment>,
		@InjectRepository(Thread)
		private readonly threads: Repository<Thread>,
	) {}

	getAllComments(): Promise<Comment[]> {
		return this.comments.find();
	}

	getCommentsByThreadId(threadId: string): Promise<Comment[]> {
		return this.comments.findBy({ thread: { id: threadId } });
	}

	async getCommentById(id: string): Promise<Comment> {
		const comment = await this.comments.findOneBy({ id, body: Not("deleted") });
		if (!comment) {
			throw new NotFoundException(`Comment with ID "${id}" not found`);
		}

		return comment;
	}

	async addNewComment(
		threadId: string,
		commentPayload: CreateCommentDto,
		author: string,
	): Promise<Comment> {
		const thread = await this.threads.findOneBy({ id: threadId });

		if (!thread) {
			throw new NotFoundException(`Thread with ID "${threadId}" not found`);
		}

		const comment = this.comments.create({
			...commentPayload,
			author,
			thread: { id: threadId },
		});

		return this.comments.save(comment);
	}

	async deleteCommentById(id: string, author: string): Promise<void> {
		const comment = await this.comments.findOneBy({ id, body: Not("deleted") });

		if (!comment) {
			throw new NotFoundException(`Comment with ID '${id}' not found`);
		}

		if (comment.author !== author) {
			throw new ForbiddenException("You can only delete your own comments");
		}

		await this.comments.update(id, {
			body: "deleted",
		});
	}
}
