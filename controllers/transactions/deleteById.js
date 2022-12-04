const { User, Transaction } = require("../../models");
const { requestError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { idParam } = req.params;
  const { _id, userBalance } = req.user;

  const transaction = await Transaction.findOneAndDelete({
    _id: idParam,
    owner: _id,
  });

  const newBalance =
    transaction.type === "income"
      ? userBalance - transaction.sum
      : userBalance + transaction.sum;
  
  await User.findOneAndUpdate(
    { _id },
    { $pull: { userTransaction: transaction._id }, userBalance: newBalance }
  );

  if (!transaction) {
    throw requestError(404, `transaction with id=${idParam} not found`);
  }
  
  res.json({
    message: "transaction deleted",
    newBalance,
  });
};

module.exports = deleteById;
