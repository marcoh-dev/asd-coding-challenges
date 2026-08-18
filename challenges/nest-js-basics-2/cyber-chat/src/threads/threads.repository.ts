import { Injectable } from "@nestjs/common";
import type { Thread, ThreadPayload } from "./threads.type";
import threadsData from "../../data/threads.seed.json";

@Injectable()
export class ThreadsRepository {
	private readonly threads = new Map<number, Thread>();
	constructor() {
		for (const thread of threadsData) {
			this.threads.set(thread.id, {
				...thread,
				createdAt: new Date(thread.createdAt),
			});
		}
	}

	findAll(): Thread[] {
		return [...this.threads.values()];
	}

	findById(id: number): Thread | undefined {
		return this.threads.get(id);
	}

	create(data: ThreadPayload): Thread {
		const newId = Math.max(...this.threads.keys()) + 1;
		const thread: Thread = { id: newId, author: "", createdAt: new Date(), ...data };
		this.threads.set(thread.id, thread);
		return thread;
	}

	deleteById(id: number): boolean {
		return this.threads.delete(id);
	}
}
