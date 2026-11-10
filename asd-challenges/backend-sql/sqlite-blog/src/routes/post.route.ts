import { Router } from "express";
import {
	listPosts,
	showPost,
	showContact,
	showAbout,
	showExamplePost,
	apiAll,
	apiSingle,
} from "../controllers/post.controller";

const router = Router();

router.get("/", listPosts);

router.get("/api/posts", apiAll);
router.get("/api/posts/:id", apiSingle);

router.get("/posts/:slug", showPost);

router.get("/contact", showContact);

router.get("/about", showAbout);

router.get("/example-post", showExamplePost);

router.use((_req, res) => {
	res.status(404).send("404 Not Found");
});

export default router;
