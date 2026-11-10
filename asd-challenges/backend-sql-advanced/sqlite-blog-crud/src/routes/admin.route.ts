import { Router } from "express";
import {
	createPost,
	newPost,
	listPosts,
	editPost,
	deletePost,
	updatePost,
} from "../controllers/admin.controller";

const router = Router();

router.get("/", listPosts);

router.post("/posts/", createPost);

router.get("/posts/new", newPost);

router.get("/posts/:slug/edit", editPost);

router.get("/posts/:slug/delete", deletePost);

router.post("/posts/:slug", updatePost);

export default router;
