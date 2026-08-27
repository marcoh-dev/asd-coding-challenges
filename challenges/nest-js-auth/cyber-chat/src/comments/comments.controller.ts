import {
	Controller,
	Get,
	Delete,
	Param,
	ParseUUIDPipe,
	SerializeOptions,
	HttpStatus,
	HttpCode,
	Request,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { Comment } from "./entities/comment.entity";
import { CommentResponseDto } from "./dtos/commentResponse.dto";
import { Public } from "../common/decorators/public.decorator";

@Controller("comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Public()
	@Get()
	@SerializeOptions({ type: CommentResponseDto })
	getAll(): Promise<Comment[]> {
		return this.commentsService.getAllComments();
	}

	@Public()
	@Get(":id")
	@SerializeOptions({ type: CommentResponseDto })
	getOne(@Param("id", ParseUUIDPipe) id: string): Promise<Comment> {
		return this.commentsService.getCommentById(id);
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	deleteOne(@Param("id", ParseUUIDPipe) id: string, @Request() req): Promise<void> {
		return this.commentsService.deleteCommentById(id, req.user.username);
	}
}
