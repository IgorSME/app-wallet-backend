const isConflict = ({ name, code }) =>
  name === "MongoServerError" && code === 11000;

const handleValidateSchemaErrors = (error, data, next) => {
  isConflict(error) ? (error.status = 409) : (error.status = 400);
  next();
};

module.exports = handleValidateSchemaErrors;
