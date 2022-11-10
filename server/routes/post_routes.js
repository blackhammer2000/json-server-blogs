const router = require("express").Router();
const Blog = require("../schemas/blog");
const Blog = require("../val/blog");

router.post("/api/read/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (!blogs) throw new Error(blogs);

    res.json({ blogs });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
