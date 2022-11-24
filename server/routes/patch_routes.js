const router = require("express").Router();
const Blog = require("../schemas/blog");
const { validateBlogBody } = require("./helpers/validators");

router.patch("/api/update/blog", validateNewBlogBody, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    if (!blog) throw new Error(blog);

    res.json({ message: "blog created", response_status: "success" });
  } catch (err) {
    res.json({ error: err.message, response_status: "failed" });
  }
});

module.exports = router;
