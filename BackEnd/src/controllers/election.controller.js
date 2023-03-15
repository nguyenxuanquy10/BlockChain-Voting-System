const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { ElectionService } = require("../services/index");

const getElecions = catchAsync(async (req, res, error) => {
  const electionns = await ElectionService.GetElection();
  res.status(httpStatus.OK).json({ electionns });
});

module.exports = {
  getElecions,
};
