const express = require("express");
const router = express.Router();
const { ctrlWrapper, auth} = require("../../middlewares");

const { user: ctrl } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrl.current));



module.exports=router
