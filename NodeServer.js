import express from "express";
import errorHandler from "./newMiddleware/errorHandler.js";

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler)

let posts = [

];

// Getting all posts
app.get("/", (req, res,next) => {
  const limit = parseInt(req.query.limit);
  const allPosts = [];

  posts.forEach((post) => {
    allPosts.push(post);
  });
  if (allPosts.length < 1) {
    const error = new Error("There are no posts present in the database. Please Update your database!!!");
  error.status = 404

  return next(error)
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

// Creating a single post
app.post("/", (req, res) => {
  const newPost = { id: posts.length + 1, title: req.body };
  if (req.body.title) {
    posts.push(newPost);
    res.status(201).json(posts);
  } else {
    res.status(400).json({ err: "The title cannot be empty" });
  }
});

// Editting a post

app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id) {
    const post = posts.find((post) => post.id === id);
if (post){
    post.title = req.body.title;
    return res.status(200).json(posts);}
    return res.status(400).json({msg: `Post with id ${id} was not found`})
  }
  return res.status(404).json({ err: "Please enter a valid ID" });
});


// Deleting a post
app.delete('/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const post_del =posts.find((post)=> post.id === id)

    if (post_del){
        posts = posts.filter((post) => post.id != post_del.id)
        return res.status(200).json(posts)
    }
    return res.status(404).json({err: `Post with id ${id} was not found`})
})
app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
