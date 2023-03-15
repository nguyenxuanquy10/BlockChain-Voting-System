const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { Schema } = mongoose;
const candidateSchema = new mongoose.Schema({
  candidateIdBlockchain: {
    type: Number,
    required: true,
  },
  candidateAddress: {
    type: String,
    trim: true,
    required: true,
  },
  electionAddress: {
    type: String,
    trim: true,
    required: true,
  },
  electionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Election",
  },
  candidateName: {
    type: String,
    trim: true,
    required: true,
  },
  candidateDescription: {
    type: String,
    trim: true,
    required: true,
  },
  candidateIPFS: {
    type: String,
    trim: true,
    required: true,
  },
  numberVoted: {
    type: Number,
    default: 0,
  },
  // [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

candidateSchema.plugin(paginate);

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
