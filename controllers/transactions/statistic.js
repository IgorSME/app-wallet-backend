const { Transaction } = require("../../models");

const statistic = async (req, res) => {
  const { _id } = req.user;
  const yearNow = new Date().getFullYear();
  const monthNow = new Date().getMonth() + 1;
  const { month = monthNow, year = yearNow } = req.query;

  const allCategories = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        type: "expense",
        month: +month,
        year: +year,
      },
    },
    {
      $group: {
        _id: { category: "$category" },
        totalSum: { $sum: "$sum" },
      },
    },
    {
      $project: {
        _id: 0,
        categoryName: "$_id.category",
        totalSum: "$totalSum",
      },
    },
  ]);

  const typesTotalSum = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        month: +month,
        year: +year,
      },
    },
    {
      $group: {
        _id: { type: "$type" },
        totalSum: { $sum: "$sum" },
      },
    },
    {
      $project: {
        _id: 0,
        typeName: "$_id.type",
        totalSum: "$totalSum",
      },
    },
  ]);
  
  res.json({
    allCategories,
    typesTotalSum,
  });
};

module.exports = statistic;
