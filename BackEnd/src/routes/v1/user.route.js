const express = require("express");
const router = express.Router();
const { userController } = require("../../controllers/index");

router.route("/getUsers").get(userController.getUserTest);
router.route("/createUser").post(userController.createUser);

module.exports = router;
