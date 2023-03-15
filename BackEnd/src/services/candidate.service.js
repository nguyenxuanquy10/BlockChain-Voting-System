const httpStatus = require("http-status");
const { Candidate } = require("../models");
const ApiError = require("../utils/ApiError");

const createCandidate = async (candidateBody) => {
  return Candidate.create(candidateBody);
};

const getCandidateById = async (candidateId) => {
  return Candidate.findById(candidateId);
};

const getCandidates = async (filter, options) => {
  const Candidates = await Candidate.paginate(filter, options);
  return Candidates;
};

const updateCandidateById = async (candidateId, updateCandidate) => {
  const candidate = await getCandidateById(candidateId);
  if (!candidate) {
    throw new ApiError(httpStatus.NOT_FOUND, "Candidate not found");
  }
  Object.assign(candidate, updateCandidate);
  await candidate.save();
  return candidate;
};
const deleteCandidatebyId = async (candidateId) => {
  const candidate = await getCandidateById(candidateId);
  if (!candidate) {
    throw new ApiError(httpStatus.NOT_FOUND, "Candidate not found");
  }
  await Candidate.remove();
  return candidate;
};
const GetCandidate = async () => {
  const candidates = await Candidate.find().populate("Election");
  return candidates;
};

const vote = async (candidateAddress) => {
  let candidate = await Candidate.findOne({
    candidateAddress: candidateAddress,
  });
  candidate.numberVoted++;
  await candidate.save();
};

module.exports = {
  createCandidate,
  getCandidateById,
  getCandidates,
  updateCandidateById,
  deleteCandidatebyId,
  GetCandidate,
  vote,
};
