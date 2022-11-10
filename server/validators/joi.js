const { object, string, required } = require("joi");

const blogValidator = object({
  title: string().required(),
  description: string().required(),
  author: string().required(),
});

module.exports = { blogValidator };
