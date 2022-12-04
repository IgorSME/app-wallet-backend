const express = require("express");
const router = express.Router();
const { ctrlWrapper, auth, isValidId } = require("../../middlewares");
const { categories: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.post("/", auth, ctrlWrapper(ctrl.add))
router.delete("/:idParam", auth, isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
