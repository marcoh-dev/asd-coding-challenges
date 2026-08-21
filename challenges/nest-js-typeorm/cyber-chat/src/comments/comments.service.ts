import { BadRequestException, Injectable } from "@nestjs/common";
import type { TCommentPayload } from "./comments.type";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Not, Repository } from "typeorm";

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(Comment)
		private readonly comments: Repository<Comment>,
	) {}

	getAllComments(): Promise<Comment[]> {
		return this.comments.find();
	}

	getCommentsByThreadId(threadId: string): Promise<Comment[]> {
		return this.comments.findBy({ thread: { id: threadId } });
	}

	getCommentById(id: string): Promise<Comment | null> {
		return this.comments.findOneBy({
			id,
			body: Not("deleted"),
		});
	}

	async addNewComment(threadId: string, { author, body }: TCommentPayload): Promise<Comment> {
		if (!author || author.trim().length < 1) {
			throw new BadRequestException("Author is required");
		}

		if (!body || body.trim().length < 3) {
			throw new BadRequestException("Body is required and must be at least 3 characters");
		}

		const comment = this.comments.create({
			author,
			body,
			thread: { id: threadId },
		});

		return this.comments.save(comment);
	}

	async deleteCommentById(id: string): Promise<boolean> {
		const result = await this.comments.update(
			{ id, body: Not("deleted") },
			{ body: "deleted" },
		);
		return (result.affected ?? 0) > 0;
	}

	async deleteCommentsByThreadId(threadId: string): Promise<number> {
		const result = await this.comments
			.createQueryBuilder()
			.delete()
			.where("threadId = :threadId", { threadId })
			.execute();

		return result.affected ?? 0;
	}
}
