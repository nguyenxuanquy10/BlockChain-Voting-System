const ethers = require("ethers");
const MainContract = require("../contract/mainContract.json");
const MainAddress = require("../contract/mainAddress.json");

const provider = new ethers.providers.WebSocketProvider("ws://localhost:8545");

const InsMainContract = new ethers.Contract(
  MainAddress.main,
  MainContract.abi,
  provider
);

module.exports = { InsMainContract };
