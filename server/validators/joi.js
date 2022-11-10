const joi = require("joi");

const blogValidator = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  author: joi.string().required(),
  date: joi.string().required(),
  reactions: joi.object().required(),
});

const deleteValidator = joi.object({
  id: joi.string().required(),
});

module.exports = { blogValidator, deleteValidator };
