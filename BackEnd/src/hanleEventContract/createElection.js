const { InsMainContract } = require("./InsMainContract.js");

const createElection = () => {
  InsMainContract.on(
    "CreateElection",
    (
      electionId,
      electionAddress,
      nameElection,
      descriptionElection,
      controllerAddress,
      addressWon,
      state,
      ipfs
    ) => {
      console.log(electionId);
    }
  );
};

module.exports = createElection;
