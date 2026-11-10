import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import request from "supertest";
import type { App } from "supertest/types.js";
import type { Repository } from "typeorm";

import { AppModule } from "@/app.module.js";
import { setupApp } from "@/app.setup.js";
import { Character } from "@/characters/character.entity.js";

const rick = {
	name: "Rick Sanchez",
	status: "Alive",
	species: "Human",
	gender: "Male",
	origin: { name: "Earth (C-137)" },
	location: { name: "Citadel of Ricks" },
	image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

const seeded = {
	name: "Seeded Rick",
	status: "Alive" as const,
	species: "Human",
	type: "",
	gender: "Male" as const,
	origin: { name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1" },
	location: { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" },
	image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
	episode: [],
	url: "https://rickandmortyapi.com/api/character/1",
};

describe("Characters (e2e)", () => {
	let app: INestApplication<App>;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();

		app = moduleRef.createNestApplication();
		setupApp(app);
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	it("creates, reads, updates and deletes a character", async () => {
		const server = app.getHttpServer();

		const created = await request(server).post("/api/characters").send(rick).expect(201);
		const id = (created.body as { id: number }).id;

		await request(server)
			.get(`/api/characters/${id}`)
			.expect(200)
			.expect((response) => {
				expect(response.body).toMatchObject({
					...rick,
					type: "",
					origin: { name: "Earth (C-137)", url: "" },
					episode: [],
				});
			});

		await request(server)
			.put(`/api/characters/${id}`)
			.send({ ...rick, status: "Dead" })
			.expect(200)
			.expect((response) => {
				expect(response.body).toMatchObject({ id, status: "Dead" });
			});

		await request(server).delete(`/api/characters/${id}`).expect(204);
		await request(server).get(`/api/characters/${id}`).expect(404);
	});

	it("creates a character without an image", async () => {
		const { image: _image, ...withoutImage } = rick;

		await request(app.getHttpServer())
			.post("/api/characters")
			.send(withoutImage)
			.expect(201)
			.expect((response) => {
				expect(response.body).toMatchObject({ name: "Rick Sanchez", image: "" });
			});
	});

	it("searches by name and paginates", async () => {
		const server = app.getHttpServer();

		await request(server).post("/api/characters").send(rick).expect(201);
		await request(server)
			.post("/api/characters")
			.send({ ...rick, name: "Morty Smith" })
			.expect(201);

		await request(server)
			.get("/api/characters?name=MORTY&limit=1")
			.expect(200)
			.expect((response) => {
				expect(response.body).toMatchObject({
					info: { count: 1, pages: 1, next: null, prev: null },
					results: [{ name: "Morty Smith" }],
				});
			});
	});

	it("treats % and _ in the search as normal characters", async () => {
		const server = app.getHttpServer();

		await request(server).post("/api/characters").send(rick).expect(201);

		await request(server)
			.get("/api/characters?name=_")
			.expect(200)
			.expect((response) => {
				expect(response.body).toMatchObject({ info: { count: 0 }, results: [] });
			});
		await request(server)
			.get("/api/characters?name=%25")
			.expect(200)
			.expect((response) => {
				expect(response.body).toMatchObject({ info: { count: 0 }, results: [] });
			});
	});

	it("lists own characters newest first, then seeded characters", async () => {
		const server = app.getHttpServer();
		const characters = app.get<Repository<Character>>(getRepositoryToken(Character));

		await characters.save(
			characters.create({
				...seeded,
				id: 1,
			}),
		);
		await request(server).post("/api/characters").send(rick).expect(201);
		await request(server)
			.post("/api/characters")
			.send({ ...rick, name: "Morty Smith" })
			.expect(201);

		await request(server)
			.get("/api/characters")
			.expect(200)
			.expect((response) => {
				const { results } = response.body as { results: { name: string }[] };

				expect(results.map(({ name }) => name)).toEqual([
					"Morty Smith",
					"Rick Sanchez",
					"Seeded Rick",
				]);
			});
	});

	it("keeps the origin and location links when their names don't change", async () => {
		const server = app.getHttpServer();
		const characters = app.get<Repository<Character>>(getRepositoryToken(Character));
		const { id } = await characters.save(characters.create(seeded));

		await request(server)
			.put(`/api/characters/${id}`)
			.send({ ...rick, origin: { name: seeded.origin.name }, location: { name: "Space" } })
			.expect(200)
			.expect((response) => {
				expect(response.body).toMatchObject({
					origin: seeded.origin,
					location: { name: "Space", url: "" },
				});
			});
	});

	it("rejects invalid input", async () => {
		const server = app.getHttpServer();

		await request(server)
			.post("/api/characters")
			.send({ ...rick, status: "Sleeping", extra: true })
			.expect(400);
		await request(server).get("/api/characters/abc").expect(400);
	});
});
