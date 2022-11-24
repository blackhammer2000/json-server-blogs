const { Schema, model } = require("mongoose");

const commentsSchema = new Schema({
  blogID: { type: String, required: true },
  comments: { type: Array, required: true },
});

const Comment = model("comment", commentsSchema);

module.exports = Comment;
