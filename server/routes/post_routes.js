const router = require("express").Router();

const Blog = require("../schemas/blog");
const Like = require("../schemas/like");
const Share = require("../schemas/share");
const Comment = require("../schemas/comment");

const { validateBlogBody } = require("./helpers/validators");

router.post("/api/create/blog", validateBlogBody, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    if (!blog) throw new Error(blog);

    const like = await Like.create({ blogID: blog._id, likes: [] });

    if (!like) throw new Error(like);

    const comment = await Comment.create({ blogID: blog._id, likes: [] });

    if (!comment) throw new Error(comment);

    const share = await Share.create({ blogID: blog._id, likes: [] });

    if (!share) throw new Error(share);

    res.json({ message: "blog created", response_status: "success" });
  } catch (err) {
    res.json({ error: err.message, response_status: "failed" });
  }
});

module.exports = router;
