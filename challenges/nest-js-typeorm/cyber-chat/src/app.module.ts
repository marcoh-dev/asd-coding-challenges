import { Module } from "@nestjs/common";
import { CommentsModule } from "./comments/comments.module";
import { ThreadsModule } from "./threads/threads.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./comments/entities/comment.entity";
import { Thread } from "./threads/entities/thread.entity";
import "dotenv/config";

@Module({
	imports: [
		CommentsModule,
		ThreadsModule,
		TypeOrmModule.forRoot({
			type: "better-sqlite3",
			database: process.env.DB_FILE!,
			entities: [Comment, Thread],
			synchronize: true,
			logging: false,
			enableWAL: true,
			statementCacheSize: 100,
		}),
	],
})
export class AppModule {}
