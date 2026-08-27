import { Module } from "@nestjs/common";
import { CommentsModule } from "./comments/comments.module";
import { ThreadsModule } from "./threads/threads.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./comments/entities/comment.entity";
import { Thread } from "./threads/entities/thread.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import "dotenv/config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwtAuth.guard";
import { User } from "./users/entities/user.entity";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "better-sqlite3",
				database: configService.getOrThrow<string>("DB_FILE"),
				entities: [Comment, Thread, User],
				synchronize: true,
				logging: false,
				enableWAL: true,
				statementCacheSize: 100,
				prepareDatabase: (db) => {
					db.pragma("foreign_keys = ON");
				},
			}),
		}),
		UsersModule,
		AuthModule,
		CommentsModule,
		ThreadsModule,
	],
	providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
