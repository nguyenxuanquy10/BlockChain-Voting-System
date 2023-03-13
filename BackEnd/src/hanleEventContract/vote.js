const { InsMainContract } = require("./InsMainContract.js");

const Vote = () => {
  InsMainContract.on(
    "Votoe",
    (electionAddress, candidateAddress, userAddress) => {
      console.log(electionAddress);
    }
  );
};

module.exports = startElection;
