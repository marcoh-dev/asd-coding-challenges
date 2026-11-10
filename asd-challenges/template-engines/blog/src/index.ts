import express from "express";
import nunjucks from "nunjucks";
import { sampleBlogData } from "./data/blog-data";
import { formatDate, indefiniteArticle, slugify } from "./helper";
import type { TPost, TPostTeaser } from "./types";

const blogData: TPost[] = sampleBlogData.map((post) => ({
  ...post,
  slug: slugify(post.title),
}));

const app = express();
const port = 3012;

const env = nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true,
});

env.addFilter("formatDate", formatDate);
env.addFilter("indefiniteArticle", indefiniteArticle);

app.use(express.json());
app.use(express.static("public"));

app.get("/", (_req, res) => {
  const twoYearsAgo = Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60 * 2;
  const blogTeaserData: TPostTeaser[] = blogData.filter(
    (post) => post.createdAt >= twoYearsAgo,
  );
  res.render("home.njk", { blogTeaserData });
});

app.get("/posts/:slug", (req, res) => {
  const post = blogData.find((post) => post.slug === req.params.slug);
  res.render("post-detail.njk", { post });
});

app.get("/posts", (_req, res) => {
  const blogTeaserData: TPostTeaser[] = blogData;
  res.render("posts.njk", { blogTeaserData });
});

app.get("/contact", (_req, res) => {
  res.render("contact.njk");
});

app.use((_req, res) => {
  res.status(404).render("404.njk");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
