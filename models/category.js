const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleValidateSchemaErrors } = require("../helpers");

const categorySchema = new Schema(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Set type "],
    },
    categoryName: {
      type: String,
      required: [true, "Set categoryName "],
      minlength: 3,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false }
);

const joyCategorySchema = Joi.object({
  type: Joi.string().required(),
  category: Joi.string().required(),
});

categorySchema.post("save", handleValidateSchemaErrors);

const Category = model("category", categorySchema);

module.exports = {
  Category,
  joyCategorySchema,
};
