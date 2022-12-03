const { isValidObjectId } = require("mongoose");

const isValidId = (req, _, next) => {
  const { categoryId } = req.params;
  if (!isValidObjectId(categoryId)) {
    const error = new Error(`${categoryId} is not correct`);
    error.status = 400;
    next(error);
  }
  next();
};

module.exports = isValidId;
