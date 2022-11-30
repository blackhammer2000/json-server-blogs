const router = require("express").Router();
const Blog = require("../schemas/blog");
const Comment = require("../schemas/comment");
const Like = require("../schemas/like");
const Share = require("../schemas/share");

router.get("/api/read/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (!blogs) throw new Error(blogs);

    res.json({ blogs });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/api/blog/reactions/read/likes", async (req, res) => {
  try {
    const blogs = await Like.findOne({ blogID: req.body.blogID });

    if (!blogs) throw new Error(blogs);

    res.json({ blogLikes: blogs.likes.length });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/api/blog/reactions/read/comments", async (req, res) => {
  try {
    const blogs = await Comment.findOne({ blogID: req.body.blogID });

    if (!blogs) throw new Error(blogs);

    res.json({ blogLikes: blogs.comments.length });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/api/blog/reactions/read/shares", async (req, res) => {
  try {
    const blogs = await Share.findOne({ blogID: req.body.blogID });

    if (!blogs) throw new Error(blogs);

    res.json({ blogLikes: blogs.shares.length });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
