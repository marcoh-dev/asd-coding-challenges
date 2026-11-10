import { type Request, type Response } from "express";
import {
	getAllBlogEntries,
	getBlogEntryBySlug,
	createBlogEntry,
	updateBlogEntry,
	deleteBlogEntry,
} from "../models/admin.model";
import type { IBlogEntry } from "../models/types";

export async function listPosts(req: Request, res: Response) {
	try {
		const entries = await getAllBlogEntries();
		res.render("admin.njk", {
			entries,
			action: req.query.action,
			id: req.query.id,
		});
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch blog entries" });
	}
}

export async function newPost(_req: Request, res: Response) {
	try {
		const entry: Omit<IBlogEntry, "id" | "createdAt"> = {title:"", teaser:"", author:"", image:"", content:""}
		res.render("adminNew.njk", {entry});
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch blog entry" });
	}
}

export async function editPost(req: Request<{ slug: string }>, res: Response) {
	try {
		const entry = await getBlogEntryBySlug(req.params.slug);
		
		res.render("adminEdit.njk", {
			entry,
		});
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch blog entry" });
	}
}

export async function createPost(
	req: Request<{ slug: string }, {}, Omit<IBlogEntry, "id" | "createdAt">>,
	res: Response,
) {
	try {
		const formData = req.body;
		const newId = await createBlogEntry(formData);

		// res.status(201).json({ id: newId });
		res.redirect(`/admin?action=created&id=${newId}`);
	} catch (err) {
		res.status(500).json({ error: "Failed to create blog entry" });
	}
}

export async function updatePost(
	req: Request<{ slug: string }, {}, Omit<IBlogEntry, "createdAt">>,
	res: Response,
) {
	try {
		const formData = req.body;
		await updateBlogEntry(formData.id, req.body);

		//res.status(200).json({ message: "Blog entry updated" });
		res.redirect(`/admin?action=updated&id=${formData.id}`);
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch blog entry" });
	}
}

export async function deletePost(req: Request<{ slug: string }>, res: Response) {
  try {

	const entry = await getBlogEntryBySlug(req.params.slug);
    await deleteBlogEntry(Number(entry!.id));
    //res.status(200).json({ message: "Blog entry deleted" });
	res.redirect(`/admin?action=deleted&id=${entry!.id}`);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog entry" });
  }
}