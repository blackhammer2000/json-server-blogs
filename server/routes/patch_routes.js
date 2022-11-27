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

router.patch("/api/reactions/update/likes", async (req, res) => {
  try {
    const { blogID, userID } = req.body;

    if (!blogID || !userID) throw new Error("Cannot proceed with the request.");

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
      const newLike = {
        userID,
        likeID: crypto.randomUUID(),
        like_time: `${new Date().toDateString()} | ${new Date().toLocaleTimeString()}`,
      };
      likes.push(newLike);
    }

    const updateLikes = await Like.findOneAndUpdate(
      { _id: like._id },
      { $set: { likes: likes } }
    );

    if (!updateLikes) throw new Error(updateLikes);

    res.status(203).json({
      likes: likes.length,
      message: `${hasLiked ? "unliked" : "liked"} `,
    });
  } catch (err) {
    if (err.message) res.status(400).json({ error: err.message });
  }
});

router.patch("/api/reactions/create/comment", async (req, res) => {
  try {
    const { blogID, userID, userComment } = req.body;

    if (!blogID || !userID) throw new Error("Cannot proceed with the request.");

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
      comment_time: `${new Date().toDateString()} | ${new Date().toLocaleTimeString()}`,
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
      message: `Comment posted`,
      comments,
    });
  } catch (err) {
    if (err.message) res.status(500).json({ error: err.message });
  }
});

router.patch("/api/reactions/comment/create/reply", async (req, res) => {
  try {
    const { blogID, userID, commentID, commentReply } = req.body;

    if (!blogID || !userID) throw new Error("Cannot proceed with the request.");

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

    let selectedComment = false;

    const updatedComments = comments.map((comment) => {
      if (comment.userID === userID && comment.commentID === commentID) {
        const { comment_replies } = comment;

        if (comment_replies === (null || undefined))
          throw new Error("Error when reading the comment's replies.");

        const comment_reply = {
          userID,
          replyID: crypto.randomUUID(),
          comment_reply_time: `${new Date().toDateString()} | ${new Date().toLocaleTimeString()}`,
          comment_reply: commentReply,
          comment_reply_likes: [],
        };

        comment_replies.push(comment_reply);

        selectedComment = !selectedComment;

        return { ...comment, comment_replies };
      } else {
        return comment;
      }
    });

    if (!selectedComment)
      throw new Error("Error when updating your comment reply.");

    const updatedCommentAndReplies = await Comment.findOneAndUpdate(
      { blogID: blog._id },
      { $set: { comments: updatedComments } }
    );

    if (!updatedCommentAndReplies) throw new Error(updatedCommentAndReplies);

    res
      .status(203)
      .json({ comments: updatedComments, message: "comment reply posted" });
  } catch (err) {
    if (err.message) res.status(500).json({ error: err.message });
  }
});

router.patch("/api/reactions/comment/update/reply", async (req, res) => {
  try {
    const { blogID, userID, commentID, replyID, commentReplyUpdate } = req.body;

    if (!blogID || !userID) throw new Error("Cannot proceed with the request.");

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

    let selectedComment = false;
    let selectedCommentReply = false;

    const updatedComments = comments.map((comment) => {
      if (comment.userID === userID && comment.commentID === commentID) {
        const { comment_replies } = comment;

        if (comment_replies === (null || undefined))
          throw new Error("Error when reading the comment's replies.");

        selectedComment = !selectedComment;

        const updatedCommentReplies = comment_replies.map((reply) => {
          if (reply.replyID === replyID) {
            reply.comment_reply = commentReplyUpdate;

            selectedCommentReply = !selectedCommentReply;

            return reply;
          } else {
            return reply;
          }
        });

        return { ...comment, comment_replies: updatedCommentReplies };
      } else {
        return comment;
      }
    });

    if (!selectedComment || !selectedCommentReply)
      throw new Error("Error when updating your comment reply.");

    const updatedCommentAndReplies = await Comment.findOneAndUpdate(
      { blogID: blog._id },
      { $set: { comments: updatedComments } }
    );

    if (!updatedCommentAndReplies) throw new Error(updatedCommentAndReplies);

    res
      .status(203)
      .json({ comments: updatedComments, message: "comment reply updated" });
  } catch (err) {
    if (err.message) res.status(500).json({ error: err.message });
  }
});

router.patch("/api/reactions/comment/reply/like", async (req, res) => {
  try {
    const { blogID, userID, commentID, replyID, commentReplyUpdate } = req.body;

    if (!blogID || !userID) throw new Error("Cannot proceed with the request.");

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

    let selectedComment = false;
    let selectedCommentReply = false;

    const updatedComments = comments.map((comment) => {
      if (comment.userID === userID && comment.commentID === commentID) {
        const { comment_replies } = comment;

        if (comment_replies === (null || undefined))
          throw new Error("Error when reading the comment's replies.");

        selectedComment = !selectedComment;

        const updatedCommentReplies = comment_replies.map((reply) => {
          if (reply.replyID === replyID && reply.userID === userID) {
            let { comment_reply_likes } = reply;

            if (comment_reply_likes === (null || undefined))
              throw new Error("Error when reading the comment reply likes.");

            selectedCommentReply = !selectedCommentReply;

            const hasLiked = comment_reply_likes.find((like) => {
              if (like.userID === userID && like.replyLikeID === replyLikeID)
                return like;
            });

            if (hasLiked) {
              comment_reply_likes = comment_reply_likes.filter((like) => {
                if (like.userID !== userID && like.replyLikeID !== replyLikeID)
                  return like;
              });
            } else {
              const newReplyLike = {
                userID,
                replyLikeID: crypto.randomUUID(),
                reply_like_time: `${new Date().toDateString()} | ${new Date().toLocaleTimeString()}`,
              };

              comment_reply_likes.push(newReplyLike);
            }

            reply.comment_reply_likes = comment_reply_likes;

            return reply;
          } else {
            return reply;
          }
        });

        return { ...comment, comment_replies: updatedCommentReplies };
      } else {
        return comment;
      }
    });

    if (!selectedComment || !selectedCommentReply)
      throw new Error("Error when updating your comment reply.");

    const updatedCommentAndReplies = await Comment.findOneAndUpdate(
      { blogID: blog._id },
      { $set: { comments: updatedComments } }
    );

    if (!updatedCommentAndReplies) throw new Error(updatedCommentAndReplies);
  } catch (err) {
    if (err.message) res.status(500).json({ error: err.message });
  }
});
module.exports = router;
