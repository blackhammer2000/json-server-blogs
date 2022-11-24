const router = require("express").Router();
const Blog = require("../schemas/blog");
const { validateBlogBody } = require("./helpers/validators");

router.patch("/api/update/blog", validateNewBlogBody, async (req, res) => {
  try {
    if (!req.body.id) throw new Error("No blog to patch.");

    if (!req.body.newData) throw new Error("No data to patch the blog.");

    const blog = await Blog.findOne({ _id: req.body.id });

    if (!blog) throw new Error(blog);

    res.json({ message: "blog created", response_status: "success" });
  } catch (err) {
    res.json({ error: err.message, response_status: "failed" });
  }
});

module.exports = router;
