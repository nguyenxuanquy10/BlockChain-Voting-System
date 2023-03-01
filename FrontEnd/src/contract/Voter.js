import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";

import React from "react";
import { VotingAddress, VotingAddressABI } from "./constants";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const fetchContract = (singerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingAddressABI, singerOrProvider);

export const VotingContext = React.createContext();

export const VotingProvider = ({ children }) => {
  return (
    <VotingContext.Provider value="QUY">{children}</VotingContext.Provider>
  );
};
