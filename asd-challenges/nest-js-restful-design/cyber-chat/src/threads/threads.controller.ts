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

@Controller("api/threads")
export class ThreadsController {
	constructor(
		private readonly threadsService: ThreadsService,
		private readonly commentsService: CommentsService,
	) {}

	@Get()
	@SerializeOptions({ type: PaginatedThreadsResponseDto })
	getAll(
		@Query() pagination: PaginationQueryDto,
		@Query("startDate", ParseDatePipe) startDate: Date,
	): Promise<{ data: Thread[]; meta: PaginationMetaResponseDto }> {
		return this.threadsService.getAllThreads(pagination, startDate);
	}

	@Get(":id")
	@SerializeOptions({ type: ThreadResponseDto })
	async getOne(
		@Param("id", ParseUUIDPipe) id: string,
	): Promise<Thread & { comments: Comment[] }> {
		const thread = await this.threadsService.getThreadById(id);
		if (!thread) {
			throw new NotFoundException(`Thread with ID "${id}" not found.`);
		}
		const comments = await this.commentsService.getCommentsByThreadId(id);
		return { ...thread, comments };
	}

	@Post()
	@SerializeOptions({ type: ThreadResponseDto })
	create(@Body() threadPayload: CreateThreadDto): Promise<Thread> {
		return this.threadsService.addNewThread(threadPayload);
	}

	@Post(":id/comments")
	@SerializeOptions({ type: CommentResponseDto })
	async addComment(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() commentPayload: CreateCommentDto,
	): Promise<Comment> {
		const thread = await this.threadsService.getThreadById(id);
		if (!thread) {
			throw new NotFoundException(`Thread with ID "${id}" not found.`);
		}
		return this.commentsService.addNewComment(id, commentPayload);
	}

	@Patch(":id")
	async update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() threadPayload: UpdateThreadDto,
	): Promise<{ message: string }> {
		const updated = await this.threadsService.updateThread(id, threadPayload);
		if (!updated) {
			throw new NotFoundException(`Thread with ID '${id}' not found`);
		}
		return {
			message: `Thread with ID "${id}" updated.`,
		};
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteOne(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
		const deletedComments = await this.commentsService.deleteCommentsByThreadId(id);
		const deleted = await this.threadsService.deleteThreadById(id);
		if (!deleted) {
			throw new NotFoundException(`Thread with ID "${id}" not found.`);
		}
	}
}
