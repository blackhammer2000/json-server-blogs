const router = require("express").Router();

const Blog = require("../schemas/blog");
const Like = require("../schemas/like");
const { route } = require("./get_routes");

const { validateBlogBody } = require("./helpers/validators");

router.patch("/api/update/blog", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("No blog to patch.");

    if (!req.body.newData) throw new Error("No data to patch the blog.");

    const { id, newData } = req.body;

    const blog = await Blog.findOne({ _id: id });

    if (!blog) throw new Error(blog);

    if (newData.hasOwnProperty("reactions")) {
      delete newData.reactions;
      throw new Error("Cannot update reactions");
    }

    for (const property in newData) {
      if (!blog[property] || !blog.hasOwnProperty(property))
        throw new Error("Invalid prop update");

      blog[property] = newData[property];
      delete newData[property];
    }

    if (Object.keys(newData))
      throw new Error("blog update error has occurred.");

    const blogUpdate = await Blog.findOneAndUpdate({ _id: id }, { $set: blog });

    if (!blogUpdate) throw new Error(blogUpdate);

    res.json({
      message: `blog ${id} updated successfully`,
      response_status: "success",
    });
  } catch (err) {
    res.json({ error: err.message, response_status: "failed" });
  }
});

router.patch("/api/update/reactions/likes", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("No blog to patch.");

    if (!req.body.newData) throw new Error("No data to patch the blog.");

    const { id, email } = req.body;

    const blog = await Blog.findOne({ _id: id });

    if (!blog) throw new Error(blog);

    const like = await Like.findOne({ blogID: id });

    if (!like) throw new Error(like);

    const { likes } = like;

    if (likes === (null || undefined))
      throw new Error("error when fetching the blog likes.");

    const hasLiked = likes.find((like) => {
      if (like.email === email) return like;
    });

    if (hasLiked) {
      likes = likes.filter((like) => {
        if (like.email !== email) return like;
      });
    } else {
      const newLike = { email };
      likes = likes.push(newLike);
    }

    const updateLikes = await Like.findOneAndUpdate(
      { _id: like._id },
      { $set: { likes: likes } }
    );

    if (!updateLikes) throw new Error(updateLikes);

    res
      .status(203)
      .json({
        message: `${
          hasLiked ? "unliked" : "liked"
        } blog with ID: ...${blog._id.slice(-5)}`,
      });
  } catch (err) {
    if (err.message) res.status(400).json({ error: err.message });
  }
});

module.exports = router;
