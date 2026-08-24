import { Comment } from "../comments/entities/comment.entity";
import { Thread } from "../threads/entities/thread.entity";
import { AppDataSource } from "./data-source";
import { commentsData, threadsData } from "./seed-data";

(async () => {
	const ds = await AppDataSource.initialize();
	await ds.synchronize(true); // drop data + recreate db, guaranteed clean slate

	const threadRepo = ds.getRepository(Thread);
	const threads = await threadRepo.save(threadsData);
	console.log(`Created ${threads.length} threads`);

	const commentRepo = ds.getRepository(Comment);
	const comments = commentsData.map((commentData) => {
		const thread = threads[commentData.threadIndex];

		return {
			author: commentData.author,
			body: commentData.body,
			thread: thread,
		};
	});

	await commentRepo.save(comments);
	console.log(`Created ${comments.length} comments`);

	await ds.destroy();
})().catch((error) => {
	console.error(error);
	process.exit(1);
});
