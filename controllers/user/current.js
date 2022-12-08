const current = async (req, res) => {
  const { name, email, userBalance, userCategories, userTransactions } = req.user;

  res.json({
    user: {
      name,
      email,
      userBalance,
      userCategories,
      userTransactions,
    },
  });
};

module.exports = current;
