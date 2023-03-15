const handleCreateElection = require("./startElection");
const createElection = require("./createElection");
const handleEvnentAddCandidate = require("./addCandidate");
const handleEventVote = require("./vote");
const handleListenEventSmartContract = () => {
  createElection();
  handleCreateElection();
  handleEvnentAddCandidate();
  handleEventVote();
};
module.exports = handleListenEventSmartContract;
