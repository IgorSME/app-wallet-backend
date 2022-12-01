const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { joiTransactionSchema } = require("../../models")
const { transactions: ctrl } = require("../../controllers")


router.post("/", auth, validation(joiTransactionSchema), ctrlWrapper(ctrl.add));
router.get("/", auth, ctrlWrapper(ctrl.getAll));

module.exports = router;
