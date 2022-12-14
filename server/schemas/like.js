const { Schema, model } = require("mongoose");

const likeSchema = new Schema({
  blogID: { type: String, required: true },
  likes: { type: Array, required: true },
});

const Like = model("like", likeSchema);

module.exports = Like;
