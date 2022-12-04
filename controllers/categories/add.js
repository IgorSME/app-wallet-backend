const { Category } = require("../../models/category");
const {User}= require("../../models/user")

const add = async (req, res) => {
  const { _id } = req.user;
  const category = await Category.create({ ...req.body, owner: _id });

  if (category) {
    await User.findByIdAndUpdate(_id,{$push:{userCategory:category._id}})
  }
  
  res.status(201).json({
    category,
  });
};

module.exports = add;
