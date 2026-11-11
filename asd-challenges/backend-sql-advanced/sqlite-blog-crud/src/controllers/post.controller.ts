import { type Request, type Response } from "express";
import { PAGE_SIZE } from "../config/constants";
import { getPosts, getPost } from "../models/post.model";
import { slugify } from "../utils/slugify";
import { formatDate } from "../utils/formatDate";
import { getAllBlogEntries, getBlogEntryById } from "../models/post.model";

export function showPost(req: Request<{ slug: string }>, res: Response) {
	const slug = req.params.slug;

	if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
		res.status(400).send("Invalid slug");
		return;
	}

	const post = getPost(slug);

	if (!post) {
		res.status(404).send("Post not found");
		return;
	}
	res.render("post.njk", {
		post: { ...post, createdAt: formatDate(post.createdAt) },
	});
}

export async function apiAll(_req: Request, res: Response) {
	try {
		const entries = await getAllBlogEntries();
		res.status(200).json(entries);
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch blog entries" });
	}
}

export async function apiSingle(req: Request, res: Response) {
	try {
		const entries = await getBlogEntryById(Number(req.params.id));
		res.status(200).json(entries);
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch blog entries" });
	}
}

export function listPosts(req: Request, res: Response) {
	const authorFilter = typeof req.query.author === "string" ? req.query.author.trim() : "";
	const sort = req.query.sort === "oldest" ? "oldest" : "newest";
	const page =
		typeof req.query.page === "string" && Number.isInteger(Number(req.query.page))
			? Math.max(1, Number(req.query.page))
			: 1;

	const posts = getPosts({ author: authorFilter, sort });

	const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const start = (currentPage - 1) * PAGE_SIZE;
	const pagedPosts = posts.slice(start, start + PAGE_SIZE);

	const view = pagedPosts.map((post) => ({
		...post,
		slug: slugify(post.title),
		createdAt: formatDate(post.createdAt),
	}));

	res.render("index.njk", {
		posts: view,
		controls: {
			author: authorFilter,
			sort,
			page: currentPage,
			totalPages,
			hasPrev: currentPage > 1,
			hasNext: currentPage < totalPages,
		},
	});
}

export function showContact(_req: Request, res: Response) {
	res.render("contact.njk");
}

export function showAbout(_req: Request, res: Response) {
	res.render("about.njk");
}
export function showExamplePost(_req: Request, res: Response) {
	res.render("postExample.njk");
}
