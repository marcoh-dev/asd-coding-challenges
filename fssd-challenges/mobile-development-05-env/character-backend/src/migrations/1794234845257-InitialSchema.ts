import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1794234845257 implements MigrationInterface {
	name = "InitialSchema1794234845257";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "character" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "status" varchar NOT NULL, "species" varchar NOT NULL, "type" varchar NOT NULL DEFAULT (''), "gender" varchar NOT NULL, "origin" text NOT NULL, "location" text NOT NULL, "image" varchar NOT NULL, "episode" text NOT NULL, "url" varchar NOT NULL DEFAULT (''), "created" datetime NOT NULL DEFAULT (datetime('now')))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "character"`);
	}
}
