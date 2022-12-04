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
      required: [true, "Set type "],
    },
    category: {
      type: String,
      required: [true, "Set category "],
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
      require: [true, "Set sum "],
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
  sum: Joi.number().positive().required(),
  balanceAfterTransaction: Joi.number(),
});

const joiUpdateCommentSchema = Joi.object({
  comment:Joi.string().required()
})

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  joiTransactionSchema,
  joiUpdateCommentSchema,
};
