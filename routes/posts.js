import express from "express";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use;
let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
  { id: 4, title: "Post Four" },
];

// getting all posts
router.get("/", );

// getting single post
router.get("/:id", );

// Posting
router.post("/", );

// putting
router.put("/:id", );
// deleting
router.delete("/:id", );
export default router;
