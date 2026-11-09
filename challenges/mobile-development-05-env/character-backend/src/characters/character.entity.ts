import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

import type { CharacterGender, CharacterStatus } from "@/characters/character.schema.js";

export type ResourceLink = {
	name: string;
	url: string;
};

@Entity()
export class Character {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ type: "varchar" })
	status: CharacterStatus;

	@Column()
	species: string;

	@Column({ default: "" })
	type: string;

	@Column({ type: "varchar" })
	gender: CharacterGender;

	@Column({ type: "simple-json" })
	origin: ResourceLink;

	@Column({ type: "simple-json" })
	location: ResourceLink;

	@Column()
	image: string;

	@Column({ type: "simple-json" })
	episode: string[];

	@Column({ default: "" })
	url: string;

	@CreateDateColumn()
	created: Date;
}
