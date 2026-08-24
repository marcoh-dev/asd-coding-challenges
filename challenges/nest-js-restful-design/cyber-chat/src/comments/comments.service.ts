import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Not, Repository } from "typeorm";
import { CreateCommentDto } from "./dtos/createComment.dto";

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

	async addNewComment(threadId: string, commentPayload: CreateCommentDto): Promise<Comment> {
		const comment = this.comments.create({
			...commentPayload,
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
