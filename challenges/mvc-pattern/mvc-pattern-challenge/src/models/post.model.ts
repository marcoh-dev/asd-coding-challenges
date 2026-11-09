import fs from "fs";
import { IPost } from "./types";
import { slugify } from "../utils/slugify";
import { postsFilePath } from "../config/constants";

export function loadPosts(): IPost[] {
	const raw = fs.readFileSync(postsFilePath, "utf8");
	return JSON.parse(raw) as IPost[];
}

type TPostParams = {
	author?: string;
	sort?: string;
};

export function getPosts({ author, sort }: TPostParams = {}) {
	const posts = loadPosts();

	const filteredPosts = author
		? posts.filter((post) =>
				post.author.toLowerCase().includes(author.toLowerCase()),
			)
		: posts;

	return [...filteredPosts].sort((a, b) => {
		if (sort === "oldest") {
			return a.createdAt - b.createdAt;
		}
		return b.createdAt - a.createdAt;
	});
}

export function getPost(slug: string): IPost | undefined {
	const posts = loadPosts();
	return posts.find((p) => slugify(p.title) === slug);
}

export function writePosts(posts: IPost[]): void {
	fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), "utf8");
}
