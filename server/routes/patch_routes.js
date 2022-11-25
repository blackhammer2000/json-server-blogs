const router = require("express").Router();

const Like = require("../schemas/like");
const Blog = require("../schemas/blog");
const Comment = require("../schemas/comment");
const crypto = require("node:crypto");

const { validateBlogBody } = require("./helpers/validators");
const User = require("../schemas/user");

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

    const { blogID, userID } = req.body;

    const user = await User.findOne({ _id: userID });

    if (!user) throw new Error("please sign up to react to any of the blogs.");

    const blog = await Blog.findOne({ _id: blogID });

    if (!blog) throw new Error(blog);

    const like = await Like.findOne({ blogID: id });

    if (!like) throw new Error(like);

    let { likes } = like;

    if (likes === (null || undefined))
      throw new Error("error when fetching the blog likes.");

    const hasLiked = likes.find((like) => {
      if (like.userID === userID) return like;
    });

    if (hasLiked) {
      likes = likes.filter((like) => {
        if (like.userID !== userID) return like;
      });
    } else {
      const newLike = { userID };
      likes = likes.push(newLike);
    }

    const updateLikes = await Like.findOneAndUpdate(
      { _id: like._id },
      { $set: { likes: likes } }
    );

    if (!updateLikes) throw new Error(updateLikes);

    res.status(203).json({
      likes: likes.length,
      message: `${
        hasLiked ? "unliked" : "liked"
      } blog with ID: ...${blog._id.slice(-5)}`,
    });
  } catch (err) {
    if (err.message) res.status(400).json({ error: err.message });
  }
});

router.patch("/api/reactions/create/comments", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("No blog to patch.");

    const { blogID, userID, userComment } = req.body;

    if (!userComment) throw new Error("No comment was submitted...");

    const user = await User.findOne({ _id: userID });

    if (!user) throw new Error("please sign up to react to any of the blogs.");

    const blog = await Blog.findOne({ _id: blogID });

    if (!blog) throw new Error(blog);

    const comment = await Comment.findOne({ blogID: blog._id });

    if (!comment) throw new Error(comment);

    let { comments } = comment;

    if (comments === (null || undefined))
      throw new Error("error when fetching the blog likes.");

    const newComment = {
      userID: user._id,
      commentID: crypto.randomUUID(),
      comment: userComment,
      comment_replies: [],
    };

    comments.push(newComment);

    const createComment = await Comment.findOneAndUpdate(
      { blogID: blog._id },
      { $set: { comments: comments } }
    );

    if (!createComment) throw new Error(createComment);

    res.status(201).json({
      message: `comment added successfully by user ${user._id}`,
      comments,
    });
  } catch (err) {
    if (err.message) res.status(500).json({ error: err.message });
  }
});

module.exports = router;
