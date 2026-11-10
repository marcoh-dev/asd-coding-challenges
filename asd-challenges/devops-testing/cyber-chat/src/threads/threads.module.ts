import { Module } from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { ThreadsController } from "./threads.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { CommentsModule } from "../comments/comments.module";

@Module({
	imports: [CommentsModule, TypeOrmModule.forFeature([Thread, Comment])],
	providers: [ThreadsService],
	controllers: [ThreadsController],
})
export class ThreadsModule {}
