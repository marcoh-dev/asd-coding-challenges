import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Like } from "typeorm";

import { Character } from "@/characters/character.entity.js";
import { CharactersService } from "@/characters/characters.service.js";

const repository = {
	findAndCount: vi.fn(),
	delete: vi.fn(),
};

describe("CharactersService", () => {
	let service: CharactersService;

	beforeEach(async () => {
		vi.clearAllMocks();

		const moduleRef = await Test.createTestingModule({
			providers: [
				CharactersService,
				{ provide: getRepositoryToken(Character), useValue: repository },
			],
		}).compile();

		service = moduleRef.get(CharactersService);
	});

	it("returns page info for the requested page", async () => {
		repository.findAndCount.mockResolvedValue([[], 45]);

		const { info } = await service.findAll({ page: 2, limit: 20, name: "" });

		expect(info).toEqual({ count: 45, pages: 3, next: 3, prev: 1 });
		expect(repository.findAndCount).toHaveBeenCalledWith(
			expect.objectContaining({ where: {}, skip: 20, take: 20 }),
		);
	});

	it("filters by name", async () => {
		repository.findAndCount.mockResolvedValue([[], 0]);

		const { info } = await service.findAll({ page: 1, limit: 20, name: "rick" });

		expect(info).toEqual({ count: 0, pages: 0, next: null, prev: null });
		expect(repository.findAndCount).toHaveBeenCalledWith(
			expect.objectContaining({ where: { name: Like("%rick%") } }),
		);
	});

	it("throws when deleting a missing character", async () => {
		repository.delete.mockResolvedValue({ affected: 0 });

		await expect(service.remove(1)).rejects.toBeInstanceOf(NotFoundException);
	});
});
