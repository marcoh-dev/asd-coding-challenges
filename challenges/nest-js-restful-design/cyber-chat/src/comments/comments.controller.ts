import {
	Controller,
	Get,
	Delete,
	Param,
	NotFoundException,
	ParseUUIDPipe,
	SerializeOptions,
	HttpStatus,
	HttpCode,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { Comment } from "./entities/comment.entity";
import { CommentResponseDto } from "./dtos/commentResponse.dto";

@Controller("api/comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Get()
	@SerializeOptions({ type: CommentResponseDto })
	getAll(): Promise<Comment[]> {
		return this.commentsService.getAllComments();
	}

	@Get(":id")
	@SerializeOptions({ type: CommentResponseDto })
	async getOne(@Param("id", ParseUUIDPipe) id: string): Promise<Comment> {
		const comment = await this.commentsService.getCommentById(id);
		if (!comment) {
			throw new NotFoundException(`Comment with ID "${id}" not found.`);
		}
		return comment;
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteOne(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
		const deleted = await this.commentsService.deleteCommentById(id);
		if (!deleted) {
			throw new NotFoundException(`Comment with ID "${id}" not found.`);
		}
	}
}
