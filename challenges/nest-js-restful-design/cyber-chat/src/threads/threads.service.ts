import { Injectable } from "@nestjs/common";
import { Thread } from "./entities/thread.entity";
import { MoreThanOrEqual, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateThreadDto } from "./dtos/updateThread.dto";
import { CreateThreadDto } from "./dtos/createThread.dto";
import { PaginationQueryDto } from "../common/dtos/paginationQuery.dto";
import { PaginationMetaResponseDto } from "../common/dtos/paginationMetaResponse.dto";

@Injectable()
export class ThreadsService {
	constructor(
		@InjectRepository(Thread)
		private readonly threads: Repository<Thread>,
	) {}
	async getAllThreads(
		pagination: PaginationQueryDto,
		startDate: Date,
	): Promise<{ data: Thread[]; meta: PaginationMetaResponseDto }> {
		const { page, limit, sort, author } = pagination;

		const [data, total] = await this.threads.findAndCount({
			where: {
				...(author && { author }),
				createdAt: MoreThanOrEqual(startDate),
			},
			order: {
				createdAt: sort === "-createdAt" ? "DESC" : "ASC",
			},
			skip: (page - 1) * limit,
			take: limit,
		});

		return {
			data,
			meta: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		};
		//return this.threads.find();
	}
	getThreadById(id: string): Promise<Thread | null> {
		return this.threads.findOneBy({ id });
	}

	addNewThread(threadPayload: CreateThreadDto): Promise<Thread> {
		const thread = this.threads.create(threadPayload);
		return this.threads.save(thread);
	}

	async updateThread(id: string, threadPayload: UpdateThreadDto): Promise<boolean> {
		const result = await this.threads.update(id, threadPayload);
		return (result.affected ?? 0) > 0;
	}

	async deleteThreadById(id: string): Promise<boolean> {
		const result = await this.threads.delete(id);
		return (result.affected ?? 0) > 0;
	}
}
