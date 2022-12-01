const current = async (req, res) => {
  const { name, email, userBalance } = req.user;
  res.json({
    user: {
      name,
      email,
      userBalance,
    },
  });
};

module.exports = current;
