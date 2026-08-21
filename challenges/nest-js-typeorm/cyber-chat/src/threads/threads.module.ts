import { Module } from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { ThreadsController } from "./threads.controller";
import { CommentsModule } from "../comments/comments.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Thread } from "./entities/thread.entity";

@Module({
	imports: [CommentsModule, TypeOrmModule.forFeature([Thread])],
	providers: [ThreadsService],
	controllers: [ThreadsController],
})
export class ThreadsModule {}
