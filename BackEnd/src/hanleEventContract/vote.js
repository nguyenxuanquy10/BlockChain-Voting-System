const { InsMainContract } = require("./InsMainContract.js");
const { CandidateService } = require("../services/index");
const catchAsync = require("../utils/catchAsync");

const vote = async (candidateAddress) => {
  await CandidateService.vote(candidateAddress);
};
const handleEventVote = catchAsync(() => {
  InsMainContract.on(
    "Vote",
    (electionAddress, candidateAddress, userAddress) => {
      vote(candidateAddress);
    }
  );
});

module.exports = handleEventVote;
