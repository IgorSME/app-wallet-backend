const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { requestError } = require("../../helpers");

const register = async (req, res) => {
  const { password, email, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, `user with email:${email} already exist`);
  }
  const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    user: {
      name,
      email,
    },
  });
};

module.exports = register;
