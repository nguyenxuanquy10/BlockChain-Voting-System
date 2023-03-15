const catchAsync = require("../utils/catchAsync");
const { ElectionService } = require("../services");
const { InsMainContract } = require("./InsMainContract.js");

const createElection = async (election) => {
  await ElectionService.createElection(election);
};
const handleCreateElection = catchAsync(
  (async = () => {
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
        const election = {
          electionIdBlockchain: Number(electionId),
          electionAddress: electionAddress.toString(),
          electionName: nameElection.toString(),
          electionDescription: descriptionElection.toString(),
          controllerAddress: controllerAddress.toString(),
          addressWon: addressWon.toString(),
          state: Number(state),
          IPFS: ipfs.toString(),
          createAt: Date.now(),
          endAt: Date.now(),
          numberCandidate: 0,
        };
        createElection(election);
      }
    );
  })
);
module.exports = handleCreateElection;
