// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./userModel.sol";
import "./candidateModel.sol";
import "./electionModel.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./state.sol";

contract Election {
    using Counters for Counters.Counter;
    Counters.Counter public _candidateId;
    // data for election
    ElectionModel electionModel;
    // data for candidate
    address[] addressCandidate;
    address[] addressUser;
    mapping(address => Candidate) candidateData;
    mapping(address => uint256) counterVoted;

    // Event
    event AddCandidate(
        uint256 _candidateId,
        address indexed _electionAddress,
        address indexed _candidateAddress,
        string _candidateName,
        string _candidateDescription,
        string _candidateIPFS
    );

    constructor(
        uint256 _id,
        address _contractController,
        string memory _name,
        string memory _descriptionElection,
        string memory _IPFS,
        uint256 _numberCandidate
    ) {
        electionModel.id = _id;
        electionModel.state = State.Create;
        electionModel.controllerAddress = _contractController;
        electionModel.descriptionElection = _descriptionElection;
        electionModel.name = _name;
        electionModel.IPFS = _IPFS;
        electionModel.numberCandidate = _numberCandidate;
        electionModel.electionAddress = address(this);
        electionModel.wonAddress = address(0);
    }

    modifier isStarted() {
        require(electionModel.state == State.Start, "Require election start");
        _;
    }

    modifier isControllerContract() {
        require(
            msg.sender == electionModel.controllerAddress,
            "Require contract creator"
        );
        _;
    }

    function startElection() external isControllerContract {
        electionModel.state = State.Start;
    }

    function endElection() external isControllerContract {
        electionModel.state = State.End;
    }

    function voteElection(address _userAddress) internal isControllerContract {
        addressUser.push(_userAddress);
    }

    function isVoted(address _userAddress) internal view returns (bool) {
        bool check = true;
        for (uint i = 0; i < addressUser.length; i++) {
            if (addressUser[i] == _userAddress) {
                check = false;
            }
        }
        return check;
    }

    function addCandidate(
        Candidate memory _candidate
    ) external isControllerContract returns (bool) {
        _candidateId.increment();
        uint256 idNumber = _candidateId.current();
        address candidateAddress = _candidate.candidateAddress;
        _candidate.candidateId = idNumber;
        addressCandidate.push(candidateAddress);
        candidateData[candidateAddress] = _candidate;
        uint256 _numberCandidate = electionModel.numberCandidate;
        electionModel.numberCandidate = _numberCandidate + 1;
        emit AddCandidate(
            idNumber,
            address(this),
            _candidate.candidateAddress,
            _candidate.candidateName,
            _candidate.candidateDescription,
            _candidate.candidateIPFS
        );

        return true;
    }

    function vote(
        address _addressCandidate,
        address _userCandidate
    ) external isStarted returns (bool) {
        bool isCandidateVoted = isVoted(_userCandidate);
        require(isCandidateVoted == true, "User have already voted");
        voteElection(_userCandidate);
        uint256 numberOfVoter = counterVoted[_addressCandidate];
        numberOfVoter++;
        counterVoted[_addressCandidate] = numberOfVoter;
        candidateData[_addressCandidate].numberVoted = numberOfVoter;
        return true;
    }

    function getElection() external view returns (ElectionModel memory) {
        return electionModel;
    }

    function getWonElection()
        external
        isControllerContract
        returns (Candidate memory)
    {
        uint256 maxVoter = 0;
        address wonVoter;
        for (uint i = 0; i < addressCandidate.length; i++) {
            if (maxVoter < counterVoted[addressCandidate[i]]) {
                maxVoter = counterVoted[addressCandidate[i]];
                wonVoter = addressCandidate[i];
            }
        }
        electionModel.wonAddress = wonVoter;
        return candidateData[wonVoter];
    }

    function getCandidates() external view returns (Candidate[] memory) {
        uint numberVoter = addressCandidate.length;
        Candidate[] memory candidates = new Candidate[](numberVoter);
        for (uint256 i = 0; i < numberVoter; i++) {
            address candidateI = addressCandidate[i];
            candidates[i] = candidateData[candidateI];
        }
        return candidates;
    }

    function getCandidate(
        address _candidateAddress
    ) external view returns (Candidate memory) {
        return candidateData[_candidateAddress];
    }

    function getUsers() external view returns (address[] memory) {
        return addressUser;
    }
}
