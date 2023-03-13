const httpStatus = require("http-status");
const fs = require("fs");
const { CandidateService } = require("../services/index");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const recordElectionAddress = catchAsync(async (req, res, err) => {
  const { electionAddress } = req.body;
  console.log(req.body);
  console.log(123);
  if (!electionAddress) {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "NOT FOUND ELECTION ADDRESS" });
  }
  fs.writeFile("../contract/electionAddress.json", electionAddress, (err) => {
    if (err) {
      console.error(err);
    }
    res.status(httpStatus.OK, "Record success file");
  });
});

const test = (req, res) => {
  console.log(123);
  res.status(httpStatus.OK).json({ message: "yes" });
};
module.exports = {
  recordElectionAddress,
  test,
};
