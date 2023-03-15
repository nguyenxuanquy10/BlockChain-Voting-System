const express = require("express");
const router = express.Router();
const { electionController } = require("../../controllers/index");

router.route("/getElections").get(electionController.getElecions);

module.exports = router;
