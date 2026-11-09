import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import type { App } from "supertest/types.js";

import { AppModule } from "@/app.module.js";
import { setupApp } from "@/app.setup.js";

const rick = {
	name: "Rick Sanchez",
	status: "Alive",
	species: "Human",
	gender: "Male",
	origin: { name: "Earth (C-137)" },
	location: { name: "Citadel of Ricks" },
	image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
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

	it("rejects invalid input", async () => {
		const server = app.getHttpServer();

		await request(server)
			.post("/api/characters")
			.send({ ...rick, status: "Sleeping", extra: true })
			.expect(400);
		await request(server).get("/api/characters/abc").expect(400);
	});
});
