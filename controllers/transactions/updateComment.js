const { requestError } = require("../../helpers");
const { Transaction } = require("../../models");

const updateComment = async (req, res) => {
  const { _id } = req.user;
  const { idParam } = req.params;
  const { comment } = req.body;
  
  const transaction = await Transaction.findOneAndUpdate(
    { _id: idParam, owner: _id },
    { comment },
    {new:true}
  );
  
  if (!transaction) {
    throw requestError(404, `transaction with ${idParam} not found`);
  }
  res.json({
    transaction,
  });
};
module.exports = updateComment;
