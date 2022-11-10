const { blogValidator } = require("../../validators/joi");

const validateBlogBody = async (req, res, next) => {
  try {
    const validBody = await blogValidator.validateAsync(req.body);

    if (!validBody) throw new Error(validBody);

    validBody.date = new Date().toLocaleDateString();

    validBody.reactions = {
      likes: [],
      comments: [],
      shares: [],
    };

    req.body = validBody;
  } catch (err) {
    res.json({ error: err.message });
  }
};
