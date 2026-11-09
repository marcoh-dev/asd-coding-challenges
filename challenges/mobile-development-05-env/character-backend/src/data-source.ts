import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DataSource } from "typeorm";

import { Character } from "@/characters/character.entity.js";
import { envSchema } from "@/config/env.schema.js";
import { migrations } from "@/migrations/index.js";

if (existsSync(".env")) process.loadEnvFile();

const { DB_FILE } = envSchema.parse(process.env);

mkdirSync(dirname(DB_FILE), { recursive: true });

export default new DataSource({
	type: "better-sqlite3",
	database: DB_FILE,
	entities: [Character],
	migrations,
});
