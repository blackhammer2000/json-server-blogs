const router = require("express").Router();
const Blog = require("../schemas/blog");
const { validateBlogBody } = require("./helpers/validators");

router.patch("/api/update/blog", validateNewBlogBody, async (req, res) => {
  try {
    if (!req.body.id) throw new Error("No blog to patch.");

    if (!req.body.newData) throw new Error("No data to patch the blog.");

    const { id, newData } = req.body;

    const blog = await Blog.findOne({ _id: id });

    if (!blog) throw new Error(blog);

    for (const property in newData) {
      if (!blog[property] || !blog.hasOwnProperty(property))
        throw new Error("Invalid prop update");

      blog[property] = newData[property];
      delete newData[property];
    }

    if (Object.keys(newData))
      throw new Error("blog update error has occurred.");

    res.json({ message: "blog created", response_status: "success" });
  } catch (err) {
    res.json({ error: err.message, response_status: "failed" });
  }
});

module.exports = router;
