import {
	Controller,
	Get,
	Delete,
	Param,
	NotFoundException,
	ParseIntPipe,
	Body,
	Post,
} from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { CommentsService } from "../comments/comments.service";
import type { Thread, ThreadPayload, ThreadWithComments } from "./threads.type";
import type { Comment, CommentPayload } from "../comments/comments.type";

@Controller("api/threads")
export class ThreadsController {
	constructor(
		private readonly threadsService: ThreadsService,
		private readonly commentsService: CommentsService,
	) {}

	@Get()
	getAll(): Thread[] {
		return this.threadsService.getAllThreads();
	}

	@Get(":id")
	getOne(@Param("id", ParseIntPipe) id: number): ThreadWithComments {
		const thread = this.threadsService.getThreadById(id);
		if (!thread) {
			throw new NotFoundException(`Thread with ID "${id}" not found.`);
		}
		const comments = this.commentsService.getCommentsByThreadId(id);
		return { ...thread, comments };
	}

	@Post()
	create(@Body() threadPayload: ThreadPayload): Thread {
		return this.threadsService.addNewThread(threadPayload.title, threadPayload.body);
	}

	@Post(":id/comments")
	addComment(
		@Param("id", ParseIntPipe) id: number,
		@Body() commentPayload: CommentPayload,
	): Comment {
		const thread = this.threadsService.getThreadById(id);
		if (!thread) {
			throw new NotFoundException(`Thread with ID "${id}" not found.`);
		}
		return this.commentsService.addNewComment(id, commentPayload);
	}

	@Delete(":id")
	deleteOne(@Param("id", ParseIntPipe) id: number): { message: string } {
		const deleted = this.threadsService.deleteThreadById(id);
		if (!deleted) {
			throw new NotFoundException(`Thread with ID "${id}" not found.`);
		}
		const deletedComments = this.commentsService.deleteCommentsByThreadId(id);
		return {
			message: `Thread with ID "${id}" ${
				deletedComments > 0 ? `and its ${deletedComments} comments` : ""
			} deleted.`,
		};
	}
}
