import express from "express";
import nunjucks from "nunjucks";
import blogRouter from "./routes/post.route";
import { viewsDir, publicDir, port } from "./config/constants";

const app = express();

nunjucks.configure(viewsDir, { autoescape: true, express: app });
app.use(express.static(publicDir));

app.use("/", blogRouter);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
