const { Transaction } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const transactions = await Transaction.find({ owner: _id }, "", {
    skip,
    limit,
  }).populate("owner", "name email");
  
  res.json({
    transactions,
  
    
  });
};

module.exports = getAll;
