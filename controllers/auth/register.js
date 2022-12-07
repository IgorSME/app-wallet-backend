const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { requestError, createTokens } = require("../../helpers");

const register = async (req, res) => {
  const { password, email, name } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw requestError(409, `user with email:${email} already exist`);
  }

  const hashedPassword = await bcrypt.hash(password,10);

  const newUser =await User.create({
    name,
    email,
    password: hashedPassword,
  });
  const { accessToken, refreshToken } = createTokens(newUser._id);
   await User.findByIdAndUpdate(newUser._id, { accessToken, refreshToken });

  res.status(201).json({
    user: {
      name,
      email,
    },
    accessToken,
    refreshToken,
  });
};

module.exports = register;
