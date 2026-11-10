import { Injectable, Logger, type OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { z } from "zod";

import { Character } from "@/characters/character.entity.js";
import { characterGenders, characterStatuses } from "@/characters/character.schema.js";
import type { Env } from "@/config/env.schema.js";

const SEED_URL = "https://rickandmortyapi.com/api/character";

const resourceLinkSchema = z.object({ name: z.string(), url: z.string() });

const seedInfoSchema = z.object({ info: z.object({ count: z.number().int() }) });

const seedCharactersSchema = z.array(
	z.object({
		id: z.number(),
		name: z.string(),
		status: z.enum(characterStatuses),
		species: z.string(),
		type: z.string(),
		gender: z.enum(characterGenders),
		origin: resourceLinkSchema,
		location: resourceLinkSchema,
		image: z.string(),
		episode: z.array(z.string()),
		url: z.string(),
		created: z.coerce.date(),
	}),
);

@Injectable()
export class CharactersSeeder implements OnApplicationBootstrap {
	private readonly logger = new Logger(CharactersSeeder.name);

	constructor(
		@InjectRepository(Character)
		private readonly characters: Repository<Character>,
		private readonly config: ConfigService<Env, true>,
	) {}

	async onApplicationBootstrap() {
		if (!this.config.get("SEED_ON_START", { infer: true })) {
			return;
		}

		if ((await this.characters.count()) > 0) {
			return;
		}

		try {
			const seeded = await this.seed();

			this.logger.log(`Seeded ${seeded} characters from the Rick and Morty API`);
		} catch (error) {
			this.logger.warn(
				`Could not seed characters, trying again on next start: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	private async seed() {
		const { info } = seedInfoSchema.parse(await fetchJson(SEED_URL));
		const ids = Array.from({ length: info.count }, (_, index) => index + 1);
		const results = seedCharactersSchema.parse(await fetchJson(`${SEED_URL}/${ids.join(",")}`));

		await this.characters.save(
			results.map((result) => this.characters.create(result)),
			{ chunk: 100 },
		);

		return results.length;
	}
}

async function fetchJson(url: string): Promise<unknown> {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}

	return response.json();
}
