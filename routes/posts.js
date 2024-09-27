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
router.get("/", (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.json(posts.slice(0, limit));
  }
  res.json({ posts });
});

// getting single post
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(posts.filter((post) => post.id === id));
});

// Posting
router.post("/", (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!newPost.title) {
    const error = new Error("Could Not send the post successfully");
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  res.status(201).json({ posts });
});

// putting
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id === parseInt(id));
  if (!post) {
    return res.json({ msg: `Post with id ${id} was not found` });
  }
  post.title = req.body.title;
  res.status(200).json({ posts });
});
// deleting
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id === parseInt(id));
  if (!post) {
    return res.json({ msg: `Post with id ${id} was not found` });
  }
  posts = posts.filter((post) => post.id != id);
  res.status(200).json({ posts });
});
export default router;
