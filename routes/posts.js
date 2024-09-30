import express from "express";
import { getPost,getPosts,createPost,editPost,deletePost } from '../controller/postController.js'
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));


// getting all posts
router.get("/", getPosts);

// getting single post
router.get("/:id", getPost);

// Posting
router.post("/", createPost);

// putting
router.put("/:id", editPost);
// deleting
router.delete("/:id", deletePost);
export default router;
