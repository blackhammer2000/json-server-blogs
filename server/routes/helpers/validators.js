const { blogValidator, deleteValidator } = require("../../validators/joi");

const validateBlogBody = async (req, res, next) => {
  try {
    const validBody = await blogValidator.validateAsync(req.body);

    if (!validBody) throw new Error(validBody);

    validBody.date = new Date().toLocaleDateString();

    req.body = validBody;

    next();
  } catch (err) {
    res.json({ error: err.message });
  }
};

const validateDeleteBody = async (req, res, next) => {
  try {
    const validBody = await deleteValidator.validateAsync(req.body);

    if (!validBody) throw new Error(validBody);

    req.body = validBody;

    next();
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = { validateBlogBody, validateDeleteBody };
