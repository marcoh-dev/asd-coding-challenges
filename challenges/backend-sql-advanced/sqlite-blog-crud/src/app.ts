import express from "express";
import nunjucks from "nunjucks";
import blogRouter from "./routes/post.route";
import adminRouter from "./routes/admin.route";
import { viewsDir, publicDir, port } from "./config/constants";
import { connectDB, closeDB } from "./db/database";
import { slugify } from "./utils/slugify";

const app = express();

await connectDB();

const env = nunjucks.configure(viewsDir, { autoescape: true, express: app });

env.addFilter("slugify", function (str: string) {
	return slugify(str);
});

app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouter);

app.use("/", blogRouter);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
	console.log("SIGINT received. Closing database connection...");
	await closeDB();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	console.log("SIGTERM received. Closing database connection...");
	await closeDB();
	process.exit(0);
});
