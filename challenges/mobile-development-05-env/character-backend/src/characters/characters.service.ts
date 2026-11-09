import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Character, type ResourceLink } from "@/characters/character.entity.js";
import type { CharacterInput, CharacterListQuery } from "@/characters/character.schema.js";

export type CharacterPage = {
	info: {
		count: number;
		pages: number;
		next: number | null;
		prev: number | null;
	};
	results: Character[];
};

@Injectable()
export class CharactersService {
	constructor(
		@InjectRepository(Character)
		private readonly characters: Repository<Character>,
	) {}

	async findAll({ page, limit, name }: CharacterListQuery): Promise<CharacterPage> {
		const query = this.characters.createQueryBuilder("character");

		if (name) {
			query.where("character.name LIKE :name ESCAPE '\\'", { name: `%${escapeLike(name)}%` });
		}

		const [results, count] = await query
			.orderBy("CASE WHEN character.url = '' THEN 0 ELSE 1 END")
			.addOrderBy("CASE WHEN character.url = '' THEN -character.id ELSE character.id END")
			.offset((page - 1) * limit)
			.limit(limit)
			.getManyAndCount();

		return { info: getPageInfo(count, page, limit), results };
	}

	async findOne(id: number) {
		const character = await this.characters.findOneBy({ id });

		if (!character) {
			throw new NotFoundException(`Character ${id} not found`);
		}

		return character;
	}

	create(input: CharacterInput) {
		return this.characters.save(
			this.characters.create({
				...toColumns(input),
				episode: [],
				url: "",
			}),
		);
	}

	async update(id: number, input: CharacterInput) {
		const character = await this.findOne(id);

		return this.characters.save(this.characters.merge(character, toColumns(input, character)));
	}

	async remove(id: number) {
		const { affected } = await this.characters.delete(id);

		if (!affected) {
			throw new NotFoundException(`Character ${id} not found`);
		}
	}
}

export function getPageInfo(count: number, page: number, limit: number) {
	const pages = Math.ceil(count / limit);

	return {
		count,
		pages,
		next: page < pages ? page + 1 : null,
		prev: page > 1 ? page - 1 : null,
	};
}

function escapeLike(value: string) {
	return value.replace(/[\\%_]/g, "\\$&");
}

function toColumns({ origin, location, ...input }: CharacterInput, existing?: Character) {
	return {
		...input,
		origin: toLink(origin.name, existing?.origin),
		location: toLink(location.name, existing?.location),
	};
}

function toLink(name: string, existing?: ResourceLink): ResourceLink {
	return { name, url: existing?.name === name ? existing.url : "" };
}
