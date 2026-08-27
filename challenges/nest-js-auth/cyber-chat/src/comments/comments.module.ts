import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Thread } from "../threads/entities/thread.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Comment, Thread])],
	exports: [CommentsService],
	providers: [CommentsService],
	controllers: [CommentsController],
})
export class CommentsModule {}
