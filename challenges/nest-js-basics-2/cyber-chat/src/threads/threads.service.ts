import { BadRequestException, Injectable } from "@nestjs/common";
import { ThreadsRepository } from "./threads.repository";
import type { Thread } from "./threads.type";

@Injectable()
export class ThreadsService {
	constructor(private readonly threadsRepository: ThreadsRepository) {}
	getAllThreads(): Thread[] {
		return this.threadsRepository.findAll();
	}
	getThreadById(id: number): Thread | undefined {
		return this.threadsRepository.findById(Number(id));
	}

	addNewThread(title: string, body: string): Thread {
		if (!title || title.trim().length < 1) {
			throw new BadRequestException("Title is required");
		}

		if (!body || body.trim().length < 10) {
			throw new BadRequestException("Body is required and must be at least 10 characters");
		}

		const author = "unknown";

		return this.threadsRepository.create({ title, body, author });
	}

	deleteThreadById(id: number): boolean {
		return this.threadsRepository.deleteById(id);
	}
}
