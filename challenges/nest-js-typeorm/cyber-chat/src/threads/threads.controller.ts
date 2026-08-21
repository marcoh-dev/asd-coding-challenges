import { Controller, Get, Delete, Param, NotFoundException, Body, Post } from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { CommentsService } from "../comments/comments.service";
import type { TThreadPayload } from "./threads.type";
import type { TCommentPayload } from "../comments/comments.type";
import { Comment } from "../comments/entities/comment.entity";
import { Thread } from "./entities/thread.entity";

@Controller("api/threads")
export class ThreadsController {
	constructor(
		private readonly threadsService: ThreadsService,
		private readonly commentsService: CommentsService,
	) {}

	@Get()
	getAll(): Promise<Thread[]> {
		return this.threadsService.getAllThreads();
	}

	@Get(":id")
	async getOne(@Param("id") id: string): Promise<Thread & { comments: Comment[] }> {
		const thread = await this.threadsService.getThreadById(id);
		if (!thread) {
			throw new NotFoundException(`Thread with ID "${id}" not found.`);
		}
		const comments = await this.commentsService.getCommentsByThreadId(id);
		return { ...thread, comments };
	}

	@Post()
	create(@Body() threadPayload: TThreadPayload): Promise<Thread> {
		return this.threadsService.addNewThread(threadPayload.title, threadPayload.body);
	}

	@Post(":id/comments")
	async addComment(
		@Param("id") id: string,
		@Body() commentPayload: TCommentPayload,
	): Promise<Comment> {
		const thread = await this.threadsService.getThreadById(id);
		if (!thread) {
			throw new NotFoundException(`Thread with ID "${id}" not found.`);
		}
		return this.commentsService.addNewComment(id, commentPayload);
	}

	@Delete(":id")
	async deleteOne(@Param("id") id: string): Promise<{ message: string }> {
		const deletedComments = await this.commentsService.deleteCommentsByThreadId(id);
		const deleted = await this.threadsService.deleteThreadById(id);
		if (!deleted) {
			throw new NotFoundException(`Thread with ID "${id}" not found.`);
		}
		return {
			message: `Thread with ID "${id}" ${
				deletedComments > 0 ? `and its ${deletedComments} comments` : ""
			} deleted.`,
		};
	}
}
