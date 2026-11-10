import {
	Controller,
	Get,
	Delete,
	Param,
	NotFoundException,
	Body,
	Post,
	Patch,
	ParseUUIDPipe,
	SerializeOptions,
	HttpCode,
	HttpStatus,
	Query,
	Request,
} from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { CommentsService } from "../comments/comments.service";
import { Comment } from "../comments/entities/comment.entity";
import { Thread } from "./entities/thread.entity";
import { CreateThreadDto } from "./dtos/createThread.dto";
import { CreateCommentDto } from "../comments/dtos/createComment.dto";
import { UpdateThreadDto } from "./dtos/updateThread.dto";
import { ThreadResponseDto } from "./dtos/threadResponse.dto";
import { CommentResponseDto } from "../comments/dtos/commentResponse.dto";
import { PaginationQueryDto } from "../common/dtos/paginationQuery.dto";
import { PaginationMetaResponseDto } from "../common/dtos/paginationMetaResponse.dto";
import { PaginatedThreadsResponseDto } from "./dtos/paginatedThreadsResponse.dto";
import { ParseDatePipe } from "../common/pipes/parseDate.pipe";
import { Public } from "../common/decorators/public.decorator";

@Controller("threads")
export class ThreadsController {
	constructor(
		private readonly threadsService: ThreadsService,
		private readonly commentsService: CommentsService,
	) {}

	@Public()
	@Get()
	@SerializeOptions({ type: PaginatedThreadsResponseDto })
	getAll(
		@Query() pagination: PaginationQueryDto,
		@Query("startDate", ParseDatePipe) startDate: Date,
	): Promise<{ data: Thread[]; meta: PaginationMetaResponseDto }> {
		return this.threadsService.getAllThreads(pagination, startDate);
	}

	@Public()
	@Get(":id")
	@SerializeOptions({ type: ThreadResponseDto })
	getOne(@Param("id", ParseUUIDPipe) id: string): Promise<Thread & { comments: Comment[] }> {
		return this.threadsService.getThreadWithComments(id);
	}

	@Post()
	@SerializeOptions({ type: ThreadResponseDto })
	create(@Body() threadPayload: CreateThreadDto, @Request() req): Promise<Thread> {
		return this.threadsService.createThread(threadPayload, req.user.username);
	}

	@Post(":id/comments")
	@SerializeOptions({ type: CommentResponseDto })
	addComment(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() commentPayload: CreateCommentDto,
		@Request() req,
	): Promise<Comment> {
		return this.commentsService.addNewComment(id, commentPayload, req.user.username);
	}

	@Patch(":id")
	async update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() threadPayload: UpdateThreadDto,
		@Request() req,
	): Promise<Thread> {
		return this.threadsService.updateThread(id, threadPayload, req.user.username);
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteOne(@Param("id", ParseUUIDPipe) id: string, @Request() req): Promise<void> {
		await this.threadsService.deleteThreadById(id, req.user.username);
	}
}
