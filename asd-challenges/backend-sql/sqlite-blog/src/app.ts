import express from "express";
import nunjucks from "nunjucks";
import blogRouter from "./routes/post.route";
import { viewsDir, publicDir, port } from "./config/constants";
import { connectDB, closeDB } from "./db/database";

const app = express();

await connectDB();

nunjucks.configure(viewsDir, { autoescape: true, express: app });
app.use(express.static(publicDir));

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
