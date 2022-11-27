const router = require("express").Router();
const Blog = require("../schemas/blog");
const { validateDeleteBody } = require("./helpers/validators");
const { ObjectId } = require("mongodb");

router.delete("/api/delete/blog", validateDeleteBody, async (req, res) => {
  try {
    const { id } = req.body;

    if (!ObjectId.isValid(id)) throw new Error("Invalid document ID.");

    const blog = await Blog.findOneAndRemove({ _id: id });

    if (!blog) throw new Error("No blog found to delete.");

    res.json({ message: "blog deleted", response_status: "success" });
  } catch (err) {
    res.json({ error: err.message, response_status: "failed" });
  }
});

router.delete("/api/reactions/delete/comment", async (req, res) => {
  try {
  } catch (err) {
    if (err.message) res.status(500).json({ error: err.message });
  }
});

module.exports = router;
