const { Transaction } = require("../../models");

const getAll = async (req, res) => {
  const { _id, userBalance } = req.user;
  const { page = 1, limit = 5} = req.query;
  const skip = (page - 1) * limit;

  const transactions = await Transaction.find({ owner: _id }, "", {
    skip,
    limit,
  }).sort({date:-1});
  const count = await Transaction.countDocuments({ owner: _id });
  const totalPages = Math.ceil(count/limit)
  res.json({
    transactions,
    userBalance,
    totalPages,
  });
};

module.exports = getAll;
