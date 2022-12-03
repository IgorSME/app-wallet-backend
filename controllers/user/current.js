const current = async (req, res) => {
  const { name, email, userBalance, userCategory, userTransaction } = req.user;

  res.json({
    user: {
      name,
      email,
      userBalance,
      userCategory,
      userTransaction,
    },
  });
};

module.exports = current;
