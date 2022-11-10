const { object, string, required } = require("joi");

const blogValidator = object({
  title: string().required(),
  description: string().required(),
  author: string().required(),
});

const deleteValidator = object({
  id: string().required(),
});

module.exports = { blogValidator, deleteValidator };
