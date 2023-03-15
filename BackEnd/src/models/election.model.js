const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const electionSchema = new mongoose.Schema({
  electionIdBlockchain: {
    type: Number,
    required: true,
  },
  electionAddress: {
    type: String,
    required: true,
    trim: true,
  },
  electionName: {
    type: String,
    required: true,
    trim: true,
  },
  electionDescription: {
    type: String,
    trim: true,
    required: true,
  },
  controllerAddress: {
    type: String,
    trim: true,
    required: true,
  },
  addressWon: {
    type: String,
    trim: true,
    required: true,
  },
  state: {
    type: Number,
    trim: true,
    required: true,
  },
  IPFS: {
    type: String,
    trim: true,
    required: true,
  },
  createAt: {
    type: Date,
    require: true,
  },
  endAt: {
    type: Date,
    require: true,
  },
  numberCandidate: {
    type: Number,
    default: 0,
  },
});

// electionSchema.plugin(paginate);

const Election = mongoose.model("Election", electionSchema);
module.exports = Election;
