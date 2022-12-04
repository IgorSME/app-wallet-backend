const bcrypt = require("bcrypt");
const { requestError, createTokens } = require("../../helpers");
const { User } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(401, `Email or password is wrong"`);
  }
   const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    throw requestError(401, `Email or password is wrong"`);
  }

  const { accessToken, refreshToken } = createTokens(user._id);
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.status(200).json({
    data: {
      name:user.name,
      email: user.email,
      accessToken,
      refreshToken,
    },
  });
};
module.exports = login;
