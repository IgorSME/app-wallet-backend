const { Transaction } = require("../../models");
const current = async (req, res) => {
  const { _id, name, email, userBalance } = req.user;
  
  const transactions =await Transaction.find({ owner: _id });

  res.json({
    user: {
      name,
      email,
      userBalance,
    },
    transactions,
  });
};

module.exports = current;
