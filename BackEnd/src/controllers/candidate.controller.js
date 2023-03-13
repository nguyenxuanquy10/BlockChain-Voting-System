const httpStatus = require("http-status");
const fs = require("fs");
const path = require("path");
const { CandidateService } = require("../services/index");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const recordElectionAddress = catchAsync(async (req, res, err) => {
  const { electionAddress } = req.body;
  if (!electionAddress) {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "NOT FOUND ELECTION ADDRESS" });
  }
  const urlPathFile = path.join(__dirname, "..", "contract");
  if (!fs.existsSync(urlPathFile)) {
    fs.mkdirSync(urlPathFile);
  }
  fs.writeFileSync(
    path.join(urlPathFile, "electionAddress.json"),
    JSON.stringify({ electionAddress }, undefined, 2)
  );
});

const test = (req, res) => {
  console.log(123);
  res.status(httpStatus.OK).json({ message: "yes" });
};
module.exports = {
  recordElectionAddress,
  test,
};
