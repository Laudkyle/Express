// Get single post
export const getPost = (req, res) => {
    const id = parseInt(req.params.id);
    res.json(posts.filter((post) => post.id === id));
  }

// Get all posts
export const getPosts = (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
      return res.json(posts.slice(0, limit));
    }
    res.json({ posts });
  }
// Create Post
export const createPost = (req, res, next) => {
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
  }
// Edit Posts
export const editPost = (req, res) => {
    const id = req.params.id;
    const post = posts.find((post) => post.id === parseInt(id));
    if (!post) {
      return res.json({ msg: `Post with id ${id} was not found` });
    }
    post.title = req.body.title;
    res.status(200).json({ posts });
  }
// Delete Post
export const deletePost =(req, res) => {
    const id = req.params.id;
    const post = posts.find((post) => post.id === parseInt(id));
    if (!post) {
      return res.json({ msg: `Post with id ${id} was not found` });
    }
    posts = posts.filter((post) => post.id != id);
    res.status(200).json({ posts });
  }