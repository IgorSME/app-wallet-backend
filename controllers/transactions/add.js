const { User, Transaction } = require("../../models");
const { requestError } = require("../../helpers");

const add = async (req, res) => {
  const { type, sum, date } = req.body;
  const { _id, userBalance } = req.user;

  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;

  const fixedSum = +sum.toFixed(2);
  const newBalance =
    type === "income" ? userBalance + fixedSum : userBalance - fixedSum;

  if (newBalance < 0) {
    throw requestError(400, "your balance is less than the transaction amount");
  }

  const transaction = await Transaction.create({
    ...req.body,
    sum: fixedSum,
    owner: _id,
    balanceAfterTransaction: newBalance?.toFixed(2),
    month,
    year,
  });

  if (transaction) {
    const updatedUser = await User.findByIdAndUpdate(_id, {
      $push: { userTransactions: transaction._id },
      userBalance: newBalance,
    });
    if (updatedUser) {
      res.status(201).json({
          transaction,
        },
      );
    }
  }
};

module.exports = add;
