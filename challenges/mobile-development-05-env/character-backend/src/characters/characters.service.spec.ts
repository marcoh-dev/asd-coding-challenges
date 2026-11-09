import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { Character } from "@/characters/character.entity.js";
import { CharactersService, getPageInfo } from "@/characters/characters.service.js";

const repository = {
	delete: vi.fn(),
};

describe("getPageInfo", () => {
	it("returns the neighbouring pages", () => {
		expect(getPageInfo(45, 2, 20)).toEqual({ count: 45, pages: 3, next: 3, prev: 1 });
	});

	it("returns no pages for an empty result", () => {
		expect(getPageInfo(0, 1, 20)).toEqual({ count: 0, pages: 0, next: null, prev: null });
	});
});

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

	it("throws when deleting a missing character", async () => {
		repository.delete.mockResolvedValue({ affected: 0 });

		await expect(service.remove(1)).rejects.toBeInstanceOf(NotFoundException);
	});
});
