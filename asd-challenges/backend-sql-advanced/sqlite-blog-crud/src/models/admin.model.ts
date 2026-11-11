import { getDB } from "../db/database";
import { IBlogEntry } from "./types";
import { slugify } from "../utils/slugify";

export async function getAllBlogEntries(): Promise<IBlogEntry[]> {
	const db = getDB();
	return await db.all<IBlogEntry[]>("SELECT * FROM blog_entries");
}

export async function getBlogEntryBySlug(slug: string): Promise<IBlogEntry | undefined> {
	const db = getDB();
	const entries = await db.all<IBlogEntry[]>("SELECT * FROM blog_entries");
	return entries.find((entry) => slugify(entry.title) === slug);
}

export async function createBlogEntry(
	entry: Omit<IBlogEntry, "id" | "createdAt">,
): Promise<number> {
	const db = getDB();
	const result = await db.run(
		`INSERT INTO blog_entries (title, teaser, author, createdAt, image, content)
	 VALUES (@title, @teaser, @author, @createdAt, @image, @content)`,
		{
			"@title": entry.title,
			"@teaser": entry.teaser,
			"@author": entry.author,
			"@createdAt": Math.floor(Date.now() / 1000),
			"@image": entry.image,
			"@content": entry.content,
		},
	);
	return result.lastID!;
}

export async function updateBlogEntry(
	id: number,
	entry: Omit<IBlogEntry, "id" | "createdAt">,
): Promise<void> {
	const db = getDB();
	await db.run(
		`UPDATE blog_entries
     SET title = @title, teaser = @teaser, author = @author, image = @image, content = @content
     WHERE id = @id`,
		{
			"@title": entry.title,
			"@teaser": entry.teaser,
			"@author": entry.author,
			"@image": entry.image,
			"@content": entry.content,
			"@id": id,
		},
	);
}

export async function deleteBlogEntry(id: number): Promise<void> {
	const db = getDB();
	await db.run(`DELETE FROM blog_entries WHERE id = @id`, { "@id": id });
}
