const router = require("express").Router();

const Blog = require("../schemas/blog");
const User = require("../schemas/user");
const Like = require("../schemas/like");
const Comment = require("../schemas/comment");

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
    const { blogID, userID, commentID, commentUpdate } = req.body;

    if (!blogID || !userID || !commentID)
      throw new Error("Cannot proceed with the request.");

    if (!commentUpdate) throw new Error("No comment was submitted...");

    const user = await User.findOne({ _id: userID });

    if (!user) throw new Error("please sign up to react to any of the blogs.");

    const blog = await Blog.findOne({ _id: blogID });

    if (!blog) throw new Error(blog);

    const comment = await Comment.findOne({ blogID: blog._id });

    if (!comment) throw new Error(comment);

    let { comments } = comment;

    if (comments === (null || undefined))
      throw new Error("error when fetching the blog likes.");

    const updatedComments = comments.filter((comment) => {
      if (comment.userID !== userID && comment.commentID !== commentID)
        return comment;
    });

    const selectedComment = comments.length > updatedComments ? true : false;

    if (!selectedComment)
      throw new Error("Error when updating your comment reply.");

    const updateComment = await Comment.findOneAndUpdate(
      { blogID: blog._id },
      { $set: { comments: updatedComments } }
    );
  } catch (err) {
    if (err.message) res.status(500).json({ error: err.message });
  }
});

module.exports = router;
