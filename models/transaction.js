const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = new Schema(
  {
    date: {
      type: Date,
      require: true,
    },
    month: Number,
    year: Number,
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String,
      required: true,
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
  date: Joi.date().timestamp("unix").required(),
  type: Joi.string().required(),
  category: Joi.string().required(),
  comment: Joi.string(),
  sum: Joi.number(),
  balanceAfterTransaction: Joi.number(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  joiTransactionSchema,
};
