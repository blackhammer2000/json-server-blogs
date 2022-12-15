const router = require("express").Router();

const Blog = require("../schemas/blog");
const User = require("../schemas/user");
const Like = require("../schemas/like");
const Share = require("../schemas/share");
const Comment = require("../schemas/comment");

// const { validateBlogBody } = require("./helpers/validators");

router.post("/api/register/user", async (req, res) => {
  try {
    if (!req.body.email) throw new Error("User data not provided.");

    const { email } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) throw new Error("user is already registered.");

    const user = await User.create({ email: email });

    if (!user._id) throw new Error(user);

    res
      .status(201)
      .json({ userID: user._id, message: "user registration successfull" });
  } catch (err) {
    if (err.message) res.status(500).json({ error: err.message });
  }
});

router.post("/api/create/blog", async (req, res) => {
  try {
    req.body.date = `${new Date().toDateString()} | ${new Date().toLocaleTimeString()}`;

    const blog = await Blog.create(req.body);

    if (!blog) throw new Error("Unable to create the blog.");

    const like = await Like.create({ blogID: blog._id, likes: [] });

    if (!like) throw new Error(like);

    const comment = await Comment.create({ blogID: blog._id, comments: [] });

    if (!comment)
      throw new Error("Unable to create the comment doc for the given blog.");

    const share = await Share.create({ blogID: blog._id, shares: [] });

    if (!share)
      throw new Error("Unable to create the share doc for the given blog.");

    res.json({ message: "blog created", response_status: "success" });
  } catch (err) {
    res.json({ error: err.message, response_status: "failed" });
  }
});

router.post("/api/read/blog", async (req, res) => {
  try {
    if (!req.body.blogID) throw new Error("provide a blog ID.");

    const blog = await Blog.findOne({ _id: req.body.blogID });

    if (!blog) throw new Error("No blog with the given id was found...");

    res.status(200).json({ blog });
  } catch (err) {
    if (err.message) res.status(500).json({ error: err.message });
  }
});

router.post("/api/blog/reactions/read/likes", async (req, res) => {
  try {
    const blog = await Like.findOne({ blogID: req.body.blogID });

    if (!blog) throw new Error("No blog with the given ID was found.");

    res.json({ likes: blog.likes });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post("/api/blog/reactions/read/comments", async (req, res) => {
  try {
    if (!req.body.blogID) throw new Error("Blog id was invalid.");

    const blog = await Comment.findOne({ blogID: req.body.blogID });

    if (!blog) throw new Error("No blog with the given ID was found.");

    res.json({ comments: blog.comments });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post("/api/blog/reactions/read/shares", async (req, res) => {
  try {
    if (!req.body.blogID) throw new Error("Blog id was invalid.");

    const blog = await Share.findOne({ blogID: req.body.blogID });

    if (!blog) throw new Error("No blog with the given ID was found.");

    res.json({ shares: blog.shares });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
