import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

import { CharactersModule } from "@/characters/characters.module.js";
import { type Env, envSchema } from "@/config/env.schema.js";
import { migrations } from "@/migrations/index.js";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, validationSchema: envSchema }),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService<Env, true>) => {
				const database = config.get("DB_FILE", { infer: true });

				mkdirSync(dirname(database), { recursive: true });

				return {
					type: "better-sqlite3",
					database,
					autoLoadEntities: true,
					migrations,
					migrationsRun: true,
				};
			},
		}),
		CharactersModule,
	],
})
export class AppModule {}
