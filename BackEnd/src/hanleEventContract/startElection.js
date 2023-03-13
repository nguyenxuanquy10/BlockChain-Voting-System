const { InsMainContract } = require("./InsMainContract.js");

const startElection = () => {
  InsMainContract.on("StartElection", (electionAddress) => {
    console.log(electionAddress);
  });
};

module.exports = startElection;
