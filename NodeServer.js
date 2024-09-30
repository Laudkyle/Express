import express from "express";

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
  { id: 4, title: "Post Four" },
];

// Getting all posts
app.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  const allPosts = [];

  posts.forEach((post) => {
    allPosts.push(post);
  });
  if (allPosts.length < 1) {
    res
      .status(404)
      .json({
        msg: "There are no posts present in the database. Please Update your database!!!",
      });
  } else {
    if (limit) {
      res.status(200).json(allPosts.slice(0, limit));
    } else {
      res.status(200).json(allPosts);
    }
  }
});

// Getting a single post
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!isNaN(id)) {
    res.status(200).json(posts.find((post) => post.id === id));
  } else {
    res.status(400).json({ err: "Pleae enter a valid ID" });
  }
});

app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
