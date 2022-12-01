const { User, Transaction } = require("../../models")

const add = async (req, res) => {
const {type,sum}=req.body
  const { _id, userBalance } = req.user;

    const newBalance =
      type === "income" ? userBalance + sum : userBalance - sum;
    
    const transaction = await Transaction.create({
      ...req.body,
      owner: _id,
      balanceAfterTransaction: newBalance,
    });

  
    
  if (transaction) {
    const updatedUser = await User.findByIdAndUpdate(_id, {
      $push: { userTransaction: transaction._id },
      userBalance: newBalance,
    });
    if (updatedUser) {
      res.status(201).json({
        data: {
          transaction,
        },
      });
    }
  }
};

module.exports = add;
