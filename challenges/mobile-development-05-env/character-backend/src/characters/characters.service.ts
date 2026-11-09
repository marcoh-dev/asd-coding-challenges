import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";

import { Character } from "@/characters/character.entity.js";
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
		const [results, count] = await this.characters.findAndCount({
			where: name ? { name: Like(`%${name}%`) } : {},
			order: { id: "ASC" },
			skip: (page - 1) * limit,
			take: limit,
		});
		const pages = Math.ceil(count / limit);

		return {
			info: {
				count,
				pages,
				next: page < pages ? page + 1 : null,
				prev: page > 1 ? page - 1 : null,
			},
			results,
		};
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

		return this.characters.save(this.characters.merge(character, toColumns(input)));
	}

	async remove(id: number) {
		const { affected } = await this.characters.delete(id);

		if (!affected) {
			throw new NotFoundException(`Character ${id} not found`);
		}
	}
}

function toColumns({ origin, location, ...input }: CharacterInput) {
	return {
		...input,
		origin: { name: origin.name, url: "" },
		location: { name: location.name, url: "" },
	};
}
