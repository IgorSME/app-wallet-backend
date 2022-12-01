const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      default: "income",
    },
    category: {
      type: String,
      enum: [
        "food",
        "car",
        "other",
        "cats",
        "educations",
        "ЗСУ",
        "fun",
        "travel",
      ],
      default: "other",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    comment: {
      type: String,
      default: "",
    },
    sum: {
      type: Number,
      require: true,
    },
    balanceAfterTransaction: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiTransactionSchema = Joi.object({
  date: Joi.date(),
  type: Joi.string(),
  category: Joi.string(),
  comment: Joi.string(),
  sum: Joi.number(),
  balanceAfterTransaction: Joi.number(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  joiTransactionSchema,
};
