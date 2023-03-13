const { InsMainContract } = require("./InsMainContract.js");

const addCandidate = () => {
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
      console.log(candidateId);
    }
  );
};

module.exports = createElection;
