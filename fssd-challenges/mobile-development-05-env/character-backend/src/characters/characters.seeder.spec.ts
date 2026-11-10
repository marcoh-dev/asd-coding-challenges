import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { Character } from "@/characters/character.entity.js";
import { CharactersSeeder } from "@/characters/characters.seeder.js";

const rick = {
	id: 1,
	name: "Rick Sanchez",
	status: "Alive",
	species: "Human",
	type: "",
	gender: "Male",
	origin: { name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1" },
	location: { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" },
	image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
	episode: ["https://rickandmortyapi.com/api/episode/1"],
	url: "https://rickandmortyapi.com/api/character/1",
	created: "2017-11-04T18:48:46.250Z",
};

const repository = {
	count: vi.fn(),
	create: vi.fn((character: unknown) => character),
	save: vi.fn(),
};

const fetchMock = vi.fn();

function jsonResponse(body: unknown) {
	return { ok: true, json: () => Promise.resolve(body) };
}

async function createSeeder(seedOnStart = true) {
	const moduleRef = await Test.createTestingModule({
		providers: [
			CharactersSeeder,
			{ provide: getRepositoryToken(Character), useValue: repository },
			{ provide: ConfigService, useValue: { get: () => seedOnStart } },
		],
	}).compile();

	return moduleRef.get(CharactersSeeder);
}

describe("CharactersSeeder", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.stubGlobal("fetch", fetchMock);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("seeds all characters into an empty database", async () => {
		repository.count.mockResolvedValue(0);
		fetchMock
			.mockResolvedValueOnce(jsonResponse({ info: { count: 2 } }))
			.mockResolvedValueOnce(jsonResponse([rick, { ...rick, id: 2, name: "Morty Smith" }]));

		await (await createSeeder()).onApplicationBootstrap();

		expect(fetchMock).toHaveBeenLastCalledWith("https://rickandmortyapi.com/api/character/1,2");
		expect(repository.save).toHaveBeenCalledWith(
			[
				expect.objectContaining({ id: 1, created: new Date(rick.created) }),
				expect.objectContaining({ id: 2, name: "Morty Smith" }),
			],
			{ chunk: 100 },
		);
	});

	it("skips seeding when characters exist", async () => {
		repository.count.mockResolvedValue(1);

		await (await createSeeder()).onApplicationBootstrap();

		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("skips seeding when disabled", async () => {
		await (await createSeeder(false)).onApplicationBootstrap();

		expect(repository.count).not.toHaveBeenCalled();
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("keeps the server running when the API is unavailable", async () => {
		repository.count.mockResolvedValue(0);
		fetchMock.mockResolvedValue({ ok: false, status: 429 });

		await expect((await createSeeder()).onApplicationBootstrap()).resolves.toBeUndefined();
		expect(repository.save).not.toHaveBeenCalled();
	});
});
