const router = require("express").Router();
const Blog = require("../schemas/blog");
const Comment = require("../schemas/comment");
// const Like = require("../schemas/like");
// const Share = require("../schemas/share");

router.get("/api/read/blogs", async (req, res) => {
  try {
    // if (!req.headers.userID) throw new Error("please sign up to proceed.");

    const blogs = await Blog.find();

    if (!blogs) throw new Error(blogs);

    res.json({ blogs });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
