import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { describe, beforeEach, it, expect, vi } from "vitest";
import { CommentsService } from "./comments.service";
import { Comment } from "./entities/comment.entity";
import { Thread } from "../threads/entities/thread.entity";

const mockCommentRepository = {
	create: vi.fn(),
	save: vi.fn(),
};

const mockThreadRepository = {
	findOneBy: vi.fn(),
};

describe("CommentsService", () => {
	let service: CommentsService;

	beforeEach(async () => {
		vi.clearAllMocks();

		const moduleRef = await Test.createTestingModule({
			providers: [
				CommentsService,
				{
					provide: getRepositoryToken(Comment),
					useValue: mockCommentRepository,
				},
				{
					provide: getRepositoryToken(Thread),
					useValue: mockThreadRepository,
				},
			],
		}).compile();

		service = moduleRef.get<CommentsService>(CommentsService);
	});

	it("associates the comment with the correct thread ID before saving", async () => {
		const threadId = "thread-1";
		const payload = { body: "I usually keep each feature in its own module." };
		const createdComment = { ...payload, author: "bob", thread: { id: threadId } };

		mockThreadRepository.findOneBy.mockResolvedValue({ id: threadId });
		mockCommentRepository.create.mockReturnValue(createdComment);
		mockCommentRepository.save.mockResolvedValue({ id: "comment-1", ...createdComment });

		const result = await service.addNewComment(threadId, payload, "bob");

		expect(mockCommentRepository.create).toHaveBeenCalledWith({
			...payload,
			author: "bob",
			thread: { id: threadId },
		});
		expect(mockCommentRepository.save).toHaveBeenCalledWith(createdComment);
		expect(result).toEqual({ id: "comment-1", ...createdComment });
	});
});
