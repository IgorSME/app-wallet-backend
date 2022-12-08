const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper, auth,isValidId } = require("../../middlewares");
const { joiTransactionSchema, joiUpdateCommentSchema } = require("../../models")
const { transactions: ctrl } = require("../../controllers")


router.post("/", auth, validation(joiTransactionSchema), ctrlWrapper(ctrl.add));
router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.get("/statistic", auth, ctrlWrapper(ctrl.statistic));
router.patch("/:idParam", auth, isValidId, validation(joiUpdateCommentSchema), ctrlWrapper(ctrl.updateComment));


module.exports = router;
