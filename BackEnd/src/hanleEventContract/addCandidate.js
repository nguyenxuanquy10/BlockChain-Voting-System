const { ElectionService } = require("../services/index");
const { CandidateService } = require("../services/index");
const { InsMainContract } = require("./InsMainContract");
const catchAsync = require("../utils/catchAsync");

const addCandidate = async (newCandidate) => {
  const electionAddress = newCandidate.electionAddress;
  const election = await ElectionService.getElectionByAddress(electionAddress);
  const electionId = election[0]._id;
  newCandidate = { ...newCandidate, electionId };
  await CandidateService.createCandidate(newCandidate);
};

const handleEvnentAddCandidate = catchAsync(async () => {
  InsMainContract.on(
    "AddCandidate",
    (
      candidateId,
      electionAddress,
      candidateAddress,
      candidateName,
      candidateDescription,
      candidateIPFS
    ) => {
      const newCandidate = {
        candidateIdBlockchain: Number(candidateId),
        candidateAddress: candidateAddress,
        electionAddress: electionAddress,
        candidateName: candidateName,
        candidateDescription: candidateDescription,
        candidateIPFS: candidateIPFS,
        numberVoted: 0,
      };
      addCandidate(newCandidate);
    }
  );
});

module.exports = handleEvnentAddCandidate;
