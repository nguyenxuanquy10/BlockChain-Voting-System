// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

struct Candidate {
    uint256 candidateId;
    address candidateAddress;
    string candidateName;
    string candidateDescription;
    string candidateIPFS;
    uint256 numberVoted;
}
