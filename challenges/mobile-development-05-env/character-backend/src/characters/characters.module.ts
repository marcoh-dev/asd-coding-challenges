import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Character } from "@/characters/character.entity.js";
import { CharactersController } from "@/characters/characters.controller.js";
import { CharactersService } from "@/characters/characters.service.js";

@Module({
	imports: [TypeOrmModule.forFeature([Character])],
	controllers: [CharactersController],
	providers: [CharactersService],
})
export class CharactersModule {}
