const router = require("express").Router();
const Blog = require("../schemas/blog");
const Like = require("../schemas/like");
const { validateBlogBody } = require("./helpers/validators");

router.post("/api/create/blog", validateBlogBody, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    if (!blog) throw new Error(blog);

    const like = await Like.create({ blogID: blog._id, likes: [] });

    if (!like) throw new Error(like);

    res.json({ message: "blog created", response_status: "success" });
  } catch (err) {
    res.json({ error: err.message, response_status: "failed" });
  }
});

module.exports = router;
