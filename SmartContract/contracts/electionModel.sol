// SPDX-License-Identifier: UNLICENSED
import "./candidateModel.sol";
import "./state.sol";
pragma solidity ^0.8.17;

struct ElectionModel {
    uint256 id;
    address electionAddress;
    string name;
    string descriptionElection;
    address controllerAddress;
    address wonAddress;
    State state;
}
