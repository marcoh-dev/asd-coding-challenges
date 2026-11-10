import { Router } from "express";
import {
	listPosts,
	showPost,
	showContact,
	showAbout,
	showExamplePost,
} from "../controllers/post.controller";

const router = Router();

router.get("/", listPosts);

router.get("/posts/:slug", showPost);

router.get("/contact", showContact);

router.get("/about", showAbout);

router.get("/example-post", showExamplePost);

export default router;
