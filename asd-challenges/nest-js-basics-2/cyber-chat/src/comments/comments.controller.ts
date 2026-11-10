import { Controller, Get, Delete, Param, NotFoundException, ParseIntPipe } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import type { Comment } from "./comments.type";

@Controller("api/comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Get()
	getAll(): Comment[] {
		return this.commentsService.getAllComments();
	}

	@Get(":id")
	getOne(@Param("id", ParseIntPipe) id: number): Comment {
		const comment = this.commentsService.getCommentById(id);
		if (!comment) {
			throw new NotFoundException(`Comment with ID "${id}" not found.`);
		}
		return comment;
	}

	@Delete(":id")
	deleteOne(@Param("id", ParseIntPipe) id: number): { message: string } {
		const deleted = this.commentsService.deleteCommentById(id);
		if (!deleted) {
			throw new NotFoundException(`Comment with ID "${id}" not found.`);
		}
		return { message: `Comment with ID "${id}" has been deleted.` };
	}
}
