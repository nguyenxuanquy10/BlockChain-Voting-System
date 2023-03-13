const { InsMainContract } = require("./InsMainContract.js");

const endElection = () => {
  InsMainContract.on("StartElection", (electionAddress) => {
    console.log(electionAddress);
  });
};

module.exports = endElection;
