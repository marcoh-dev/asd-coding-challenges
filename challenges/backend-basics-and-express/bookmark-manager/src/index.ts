import express from "express";
import { bookmarkData } from "./sampledata.js";
let bookmarks = bookmarkData;

const app = express();
const port = 3010;
app.use(express.json());

app.get("/", (_req, res) => {
	res.send("Hello World");
});

app.get("/bookmarks/:id", (req, res) => {
	const bookmark = bookmarks.find(
		(bookmark) => bookmark.id === Number(req.params.id),
	);

	if (!bookmark) {
		res.status(404).json({ error: "Bookmark not found" });
		return;
	}

	res.json(bookmark);
});

app.get("/bookmarks", (req, res) => {
	const tagFilter = req.query.tag;
	console.log(tagFilter);

	res.json(tagFilter ? bookmarks.filter((b) => b.tag === tagFilter) : bookmarks);
});

app.post("/bookmarks", (req, res) => {
	let fieldsMissing: string[] = [];

	if (!req.body.title) {
		fieldsMissing.push("title");
	}

	if (!req.body.url) {
		fieldsMissing.push("url");
	}

	if (fieldsMissing.length > 0) {
		res
			.status(404)
			.json({
				error: `Missing required field${fieldsMissing.length !== 1 ? "s" : ""}: ${fieldsMissing.join(", ")}`,
			});
		return;
	}

	const newBookmark = { id: bookmarks.length + 1, ...req.body };
	bookmarks.push(newBookmark);
	res.status(201).json(newBookmark);
});

app.patch("/bookmarks/:id", (req, res) => {
	const index = bookmarks.findIndex(
		(bookmark) => bookmark.id === Number(req.params.id),
	);

	if (index === -1) {
		res.status(404).json({ error: "Bookmark not found" });
		return;
	}

	const updatedBookmark = {
		...bookmarks[index],
		...req.body,
	};

	bookmarks[index] = updatedBookmark;
	console.log(updatedBookmark);
	res.json(bookmarks[index]);
});

app.delete("/bookmarks/:id", (req, res) => {
	bookmarks = bookmarks.filter((b) => b.id !== Number(req.params.id));
	res.status(204).send();
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
