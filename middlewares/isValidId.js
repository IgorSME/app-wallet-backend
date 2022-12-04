const { isValidObjectId } = require("mongoose");

const isValidId = (req, _, next) => {
  const { idParam } = req.params;
  
  if (!isValidObjectId(idParam)) {
    const error = new Error(`${idParam} is not correct`);
    error.status = 400;
    next(error);
  }
  next();
};

module.exports = isValidId;
