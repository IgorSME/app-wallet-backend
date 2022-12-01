const bcrypt = require("bcrypt");
const { requestError, createTokens } = require("../../helpers");
const { User } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compare(password, user.password)) {
    throw requestError(401, `Email or password is wrong"`);
  }

  const { accessToken, refreshToken } = createTokens(user._id);
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.status(200).json({
    data: {
      email: user.email,
      accessToken,
      refreshToken,
    },
  });
};
module.exports = login;
