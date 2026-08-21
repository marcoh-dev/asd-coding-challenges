import "reflect-metadata";
import { DataSource } from "typeorm";
import { Comment } from "../comments/entities/comment.entity";
import { Thread } from "../threads/entities/thread.entity";
import "dotenv/config";

export const AppDataSource = new DataSource({
	type: "better-sqlite3",
	database: process.env.DB_FILE!,
	entities: [Comment, Thread],
	migrations: ["src/db/migrations/*.ts"],
	synchronize: false,
});
