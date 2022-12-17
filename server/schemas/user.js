const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const User = model("user", userSchema);

module.exports = User;
