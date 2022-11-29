const router = require("express").Router();

const User = require("../schemas/user");
const Like = require("../schemas/like");
const Blog = require("../schemas/blog");
const Comment = require("../schemas/comment");
const crypto = require("node:crypto");

// const { validateBlogBody } = require("./helpers/validators");

router.patch("/api/update/blog", async (req, res) => {
  try {
    if (!req.body.blogID) throw new Error("No blog to patch.");

    if (!req.body.newData) throw new Error("No data to patch the blog.");

    const { blogID, newData } = req.body;

    const blog = await Blog.findOne({ _id: blogID });

    if (!blog) throw new Error(blog);

    if (
      newData.hasOwnProperty(
        "reactions" || "_id" || "ID" || "_ID" || "id" || "Id" || "iD"
      )
    ) {
      delete newData.reactions;
      delete newData._id;
      throw new Error("Cannot update reactions");
    }

    for (const property in newData) {
      console.log(blog[property]);
      if (blog[property] === (null || undefined))
        throw new Error("Invalid prop update");

      blog[property] = newData[property];
      delete newData[property];
    }

    if (Object.keys(newData).length)
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

    const like = await Like.findOne({ blogID: blogID });

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
      message: `${hasLiked ? "unliked" : "liked"}`,
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
      userID: user._id.toString(),
      commentID: crypto.randomUUID(),
      comment_time: `${new Date().toDateString()} | ${new Date().toLocaleTimeString()}`,
      comment: userComment,
      comment_likes: [],
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

router.patch("/api/reactions/edit/comment", async (req, res) => {
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

    const { comments } = comment;

    if (comments === (null || undefined))
      throw new Error("error when fetching the blog likes.");

    let selectedComment = false;

    const updatedComments = comments.map((comment) => {
      if (comment.userID === userID && comment.commentID === commentID) {
        if (!comment.comment) throw new Error("Cannot update blank comment.");
        comment.comment = commentUpdate;

        selectedComment = true;

        return comment;
      } else {
        return comment;
      }
    });

    if (!selectedComment)
      throw new Error("Error when updating your comment reply.");

    const updateComment = await Comment.findOneAndUpdate(
      { blogID: blog._id },
      { $set: { comments: updatedComments } }
    );

    if (!updateComment) throw new Error(updateComment);

    res
      .status(203)
      .json({ comments: updatedComments, message: "comment updated" });
  } catch (err) {
    if (err.message) res.status(500).json({ error: err.message });
  }
});

router.patch("/api/reactions/comment/like", async (req, res) => {
  try {
    const { blogID, userID, commentID, commentLikeID } = req.body;

    if (!blogID || !userID || !commentID)
      throw new Error("Cannot proceed with the request.");

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
    let newCommentLikes = 0;
    let liked = false;

    const updatedComments = comments.map((comment) => {
      if (comment.userID === userID && comment.commentID === commentID) {
        if (!comment.hasOwnProperty("comment_likes"))
          throw new Error("Cannot update the like for this comment.");

        // console.log(comment);

        let { comment_likes } = comment;

        if (comment_likes === (null || undefined))
          throw new Error("Error when liking the comment.");

        selectedComment = !selectedComment;

        const hasLiked = comment_likes.find((like) => {
          if (like.userID === userID) return like;
        });

        console.log(hasLiked);

        if (hasLiked) {
          comment_likes = comment_likes.filter((like) => {
            if (like.userID !== userID) return like;
          });
        } else {
          const newCommentLike = {
            userID,
            commentLikeID: crypto.randomUUID(),
            comment_like_time: `${new Date().toDateString()} | ${new Date().toLocaleTimeString()}`,
          };

          comment_likes.push(newCommentLike);
        }

        newCommentLikes = comment_likes.length;
        liked = hasLiked ? true : false;
        comment.comment_likes = comment_likes;

        return comment;
      } else {
        return comment;
      }
    });

    if (!selectedComment)
      throw new Error("Error when updating your comment like.");

    const updateComment = await Comment.findOneAndUpdate(
      { blogID: blog._id },
      { $set: { comments: updatedComments } }
    );

    if (!updateComment) throw new Error(updateComment);

    res.status(203).json({
      likes: newCommentLikes,
      message: `${liked ? "unliked" : "liked"}`,
    });
  } catch (err) {
    if (err.message) res.status(500).json({ error: err.message });
  }
});

router.patch("/api/reactions/comment/create/reply", async (req, res) => {
  try {
    const { blogID, userID, commentID, commentReply } = req.body;

    if (!blogID || !userID || !commentID)
      throw new Error("Cannot proceed with the request.");

    if (!commentReply) throw new Error("No comment was submitted...");

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

        comment.comment_replies = comment_replies;

        return comment;
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

    if (!blogID || !userID || !commentID)
      throw new Error("Cannot proceed with the request.");

    if (!commentReplyUpdate) throw new Error("No reply was submitted...");

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
          if (reply.userID === userID && reply.replyID === replyID) {
            reply.comment_reply = commentReplyUpdate;

            selectedCommentReply = !selectedCommentReply;

            return reply;
          } else {
            return reply;
          }
        });

        comment.comment_replies = updatedCommentReplies;

        return comment;
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
    const { blogID, userID, commentID, replyID, replyLikeID } = req.body;

    if (!blogID || !userID || !commentID)
      throw new Error("Cannot proceed with the request.");

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
    let newLikes = 0;
    let liked = false;

    const updatedComments = comments.map((comment) => {
      if (comment.userID === userID && comment.commentID === commentID) {
        const { comment_replies } = comment;

        if (comment_replies === (null || undefined))
          throw new Error("Error when reading the comment's replies.");

        selectedComment = !selectedComment;

        const updatedCommentReplies = comment_replies.map((reply) => {
          if (reply.userID === userID && reply.replyID === replyID) {
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

            newLikes = comment_reply_likes.length;

            liked = hasLiked ? true : false;

            reply.comment_reply_likes = comment_reply_likes;

            return reply;
          } else {
            return reply;
          }
        });

        comment.comment_replies = updatedCommentReplies;

        return comment;
      } else {
        return comment;
      }
    });

    if (!selectedComment || !selectedCommentReply)
      throw new Error("Error when updating your comment reply.");

    const updatedCommentAndRepliesLikes = await Comment.findOneAndUpdate(
      { blogID: blog._id },
      { $set: { comments: updatedComments } }
    );

    if (!updatedCommentAndRepliesLikes)
      throw new Error(updatedCommentAndRepliesLikes);

    res.status(203).json({
      replyLikes: newLikes,
      message: `${liked ? "unliked" : "liked"}`,
    });
  } catch (err) {
    if (err.message) res.status(500).json({ error: err.message });
  }
});
module.exports = router;
