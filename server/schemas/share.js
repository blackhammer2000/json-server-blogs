const { Schema, model } = require("mongoose");

const shareSchema = new Schema({
  blogID: { type: String, required: true },
  shares: { type: Array, required: true },
});

const Share = model("like", shareSchema);

module.exports = Share;
