import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";

import {
	characterIdSchema,
	type CharacterInput,
	characterInputSchema,
	type CharacterListQuery,
	characterListQuerySchema,
} from "@/characters/character.schema.js";
import { CharactersService } from "@/characters/characters.service.js";

@Controller("characters")
export class CharactersController {
	constructor(private readonly charactersService: CharactersService) {}

	@Get()
	findAll(@Query({ schema: characterListQuerySchema }) query: CharacterListQuery) {
		return this.charactersService.findAll(query);
	}

	@Get(":id")
	findOne(@Param("id", { schema: characterIdSchema }) id: number) {
		return this.charactersService.findOne(id);
	}

	@Post()
	create(@Body({ schema: characterInputSchema }) input: CharacterInput) {
		return this.charactersService.create(input);
	}

	@Put(":id")
	update(
		@Param("id", { schema: characterIdSchema }) id: number,
		@Body({ schema: characterInputSchema }) input: CharacterInput,
	) {
		return this.charactersService.update(id, input);
	}

	@Delete(":id")
	@HttpCode(204)
	remove(@Param("id", { schema: characterIdSchema }) id: number) {
		return this.charactersService.remove(id);
	}
}
