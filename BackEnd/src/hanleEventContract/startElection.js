const { InsMainContract } = require("./InsMainContract.js");

const startElection = () => {
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

module.exports = startElection;
