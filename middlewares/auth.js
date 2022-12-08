const jwt = require("jsonwebtoken");
const { User } = require("./../models");
const { requestError } = require("../helpers");
const { SECRET_KEY_ACCESS } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw requestError(401, "Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY_ACCESS);
    const user = await User.findById(id).populate([
      "userTransactions",
      { path: "userTransactions", options: { sort: { date: -1 } } },
      "userCategories",
    ]);

    if (!user) {
      throw requestError(401, "Not authorized");
    }

    if (!user.accessToken) {
      throw requestError(401, "Token expired");
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error.message === "invalid signature" ||
      error.message === "invalid token"
    ) {
      error.status = 401;
    }
    // accessToken expired
    if (error.message === "jwt expired") {
      error.status = 412;
      error.message = "OOOPS";
    }
    next(error);
  }
};

module.exports = auth;
