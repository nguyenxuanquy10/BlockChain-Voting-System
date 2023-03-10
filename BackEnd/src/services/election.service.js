const httpStatus = require("http-status");
const { Election } = require("../models");
const ApiError = require("../utils/ApiError");

const createElection = async (electionBody) => {
  return Election.create(electionBody);
};

const getElectionById = async (electionId) => {
  return Election.findById(electionId);
};

const getElection = async (filter, options) => {
  const elections = await Election.paginate(filter, options);
  return elections;
};

const updateElectionById = async (electionId, updateElection) => {
  const election = await getElectionById(electionId);
  if (!election) {
    throw new ApiError(httpStatus.NOT_FOUND, "Election not found");
  }
  Object.assign(election, updateElection);
  await election.save();
  return election;
};
const deleteElectionbyId = async (electionId) => {
  const election = await getElectionById(electionId);
  if (!election) {
    throw new ApiError(httpStatus.NOT_FOUND, "Election not found");
  }
  await election.remove();
  return election;
};
module.exports = {
  createElection,
  getElectionById,
  getElection,
  updateElectionById,
  deleteElectionbyId,
};
