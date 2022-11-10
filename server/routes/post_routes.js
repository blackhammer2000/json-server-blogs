const router = require("express").Router();
const Blog = require("../schemas/blog");
const { validateBlogBody } = require("./helpers/validators");

router.post("/api/create/blog", validateBlogBody, async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (!blogs) throw new Error(blogs);

    res.json({ blogs });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
