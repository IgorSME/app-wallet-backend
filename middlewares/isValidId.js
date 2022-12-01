const { isValidObjectId } = require("mongoose");

const isValidId = (req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    const error = new Error(`${id} is not correct`);
    error.status = 400;
    next(error);
  }
  next();
};

module.exports = isValidId;
