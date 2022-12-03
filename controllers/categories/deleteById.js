const { Category } = require("../../models/category");
const { User } = require("../../models/user");
const { requestError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { categoryId } = req.params;
  const { _id } = req.user;
  const category = await Category.findOneAndDelete({
    _id: categoryId,
    owner: _id,
  });
  if (!category) {
    throw requestError(404, `category with id=${categoryId} not found`);
  }
  await User.findByIdAndUpdate(_id, {
    $pull: { userCategory: category._id },
  });
  res.json({
    message: "category deleted",
  });
};

module.exports = deleteById;
