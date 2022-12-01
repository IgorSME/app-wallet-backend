const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken:"", refreshToken:"" });
  res.status(204);
};

module.exports = logout;
