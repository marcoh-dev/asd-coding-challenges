import { Controller, Get, Delete, Param, NotFoundException } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { Comment } from "./entities/comment.entity";

@Controller("api/comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Get()
	getAll(): Promise<Comment[]> {
		return this.commentsService.getAllComments();
	}

	@Get(":id")
	async getOne(@Param("id") id: string): Promise<Comment> {
		const comment = await this.commentsService.getCommentById(id);
		if (!comment) {
			throw new NotFoundException(`Comment with ID "${id}" not found.`);
		}
		return comment;
	}

	@Delete(":id")
	async deleteOne(@Param("id") id: string): Promise<{ message: string }> {
		const deleted = await this.commentsService.deleteCommentById(id);
		if (!deleted) {
			throw new NotFoundException(`Comment with ID "${id}" not found.`);
		}
		return { message: `Comment with ID "${id}" has been deleted.` };
	}
}
