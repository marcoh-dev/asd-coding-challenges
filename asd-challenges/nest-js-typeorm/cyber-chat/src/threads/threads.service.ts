import { BadRequestException, Injectable } from "@nestjs/common";
import { Thread } from "./entities/thread.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ThreadsService {
	constructor(
		@InjectRepository(Thread)
		private readonly threads: Repository<Thread>,
	) {}
	getAllThreads(): Promise<Thread[]> {
		return this.threads.find();
	}
	getThreadById(id: string): Promise<Thread | null> {
		return this.threads.findOneBy({ id });
	}

	addNewThread(title: string, body: string): Promise<Thread> {
		if (!title || title.trim().length < 1) {
			throw new BadRequestException("Title is required");
		}

		if (!body || body.trim().length < 10) {
			throw new BadRequestException("Body is required and must be at least 10 characters");
		}

		const thread = this.threads.create({ title, body });

		return this.threads.save(thread);
	}

	async deleteThreadById(id: string): Promise<boolean> {
		const result = await this.threads.delete(id);
		return (result.affected ?? 0) > 0;
	}
}
