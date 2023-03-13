const express = require("express");
const { candidateController } = require("../../controllers/index.js");
const router = express.Router();

router
  .route("/recordCandidateAddress")
  .post(candidateController.recordElectionAddress);
router.route("/test").get(candidateController.test);
module.exports = router;
