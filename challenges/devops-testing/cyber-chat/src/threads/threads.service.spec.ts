import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { describe, beforeEach, it, expect, vi } from "vitest";
import { ThreadsService } from "./threads.service";
import { Thread } from "./entities/thread.entity";
import { NotFoundException } from "@nestjs/common";

const mockThreadRepository = {
	findAndCount: vi.fn(),
	findOneBy: vi.fn(),
	findOne: vi.fn(),
	create: vi.fn(),
	save: vi.fn(),
	delete: vi.fn(),
};

describe("ThreadService", () => {
	let service: ThreadsService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				ThreadsService,
				{
					provide: getRepositoryToken(Thread),
					useValue: mockThreadRepository,
				},
			],
		}).compile();

		service = moduleRef.get<ThreadsService>(ThreadsService);
	});

	it("returns threads with pagination metadata", async () => {
		const testThreads = [
			{
				id: "thread-1",
				title: "Best way to structure a NestJS project?",
				body: "I am starting a new NestJS project and wondering how others organize modules, services, controllers, and shared utilities.",
				createdAt: "2026-08-27T06:51:56.000Z",
				author: "alice",
			},
			{
				id: "thread-2",
				title: "How do you handle authentication?",
				body: "What authentication strategy are you using in your NestJS applications? I am considering JWT with refresh tokens.",
				createdAt: "2026-08-27T06:51:56.000Z",
				author: "bob",
			},
		];

		mockThreadRepository.findAndCount.mockResolvedValue([testThreads, 2]);

		const result = await service.getAllThreads({ page: 1, limit: 10, sort: "" }, new Date());

		expect(result.data).toEqual(testThreads);
		expect(result.meta).toEqual({
			page: 1,
			limit: 10,
			total: 2,
			totalPages: 1,
		});
	});

	it("returns thread object including comments", async () => {
		const testThreadWithComments = {
			id: "thread-1",
			title: "Best way to structure a NestJS project?",
			body: "I am starting a new NestJS project and wondering how others organize modules, services, controllers, and shared utilities.",
			createdAt: "2026-08-27T06:51:56.000Z",
			author: "alice",
			comments: [
				{
					id: "comment-1",
					body: "I usually keep each feature in its own module and avoid putting too much shared logic in a global module.",
					createdAt: "2026-08-27T06:51:56.000Z",
					author: "bob",
				},
				{
					id: "comment-2",
					body: "Same here. I have found that feature-based organization scales much better as the project grows.",
					createdAt: "2026-08-27T06:51:56.000Z",
					author: "diana",
				},
			],
		};

		mockThreadRepository.findOne.mockResolvedValue(testThreadWithComments);

		const result = await service.getThreadWithComments("thread-1");

		expect(mockThreadRepository.findOne).toHaveBeenCalledWith({
			where: {
				id: "thread-1",
			},
			relations: {
				comments: true,
			},
		});

		expect(result).toEqual(testThreadWithComments);
	});

	it("throws a NotFoundException when the thread does not exist", async () => {
		mockThreadRepository.findOne.mockResolvedValue(null);

		await expect(
			service.getThreadWithComments("9a9999a9-a99a-9999-9999-9a9999aa9a99"),
		).rejects.toThrow(NotFoundException);
	});

	it("passes the DTO to the repository’s save method and returns the new thread", async () => {
		const testThread = {
			title: "Best way to structure a NestJS project?",
			body: "I am starting a new NestJS project and wondering how others organize modules, services, controllers, and shared utilities.",
		};

		const thread = {
			...testThread,
			author: "alice",
		};

		mockThreadRepository.create.mockReturnValue(thread);
		mockThreadRepository.save.mockResolvedValue(thread);

		const result = await service.createThread(testThread, "alice");

		expect(mockThreadRepository.create).toHaveBeenCalledWith({
			...testThread,
			author: "alice",
		});

		expect(mockThreadRepository.save).toHaveBeenCalledWith(thread);
		expect(result).toEqual(thread);
	});

	it("deletes the thread when it belongs to the author", async () => {
		const testThread = {
			id: "thread-1",
			title: "Best way to structure a NestJS project?",
			body: "I am starting a new NestJS project and wondering how others organize modules, services, controllers, and shared utilities.",
			createdAt: "2026-08-27T06:51:56.000Z",
			author: "alice",
		};

		mockThreadRepository.findOneBy.mockResolvedValue(testThread);
		mockThreadRepository.delete.mockResolvedValue({ affected: 1 });

		const result = await service.deleteThreadById("thread-1", "alice");

		expect(mockThreadRepository.findOneBy).toHaveBeenCalledWith({
			id: "thread-1",
		});

		expect(mockThreadRepository.delete).toHaveBeenCalledWith("thread-1");
		expect(result).toBe(true);
	});

	it("returns false when the thread was not deleted", async () => {
		const testThread = {
			id: "thread-1",
			author: "alice",
		};

		mockThreadRepository.findOneBy.mockResolvedValue(testThread);
		mockThreadRepository.delete.mockResolvedValue({ affected: 0 });

		const result = await service.deleteThreadById("thread-1", "alice");

		expect(mockThreadRepository.delete).toHaveBeenCalledWith("thread-1");
		expect(result).toBe(false);
	});
});
