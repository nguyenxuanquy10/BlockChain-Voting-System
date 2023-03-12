// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./userModel.sol";
import "./election.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Main {
    using Counters for Counters.Counter;
    Counters.Counter public _electionId;
    // Counters.Counter public _candidateId;
    address public admin;
    address[] electionAddress;

    // Event
    event CreateElection(
        uint256 _electionId,
        address _electionAddress,
        string indexed _nameElection,
        string indexed _descriptionelection,
        address _controllerAddress,
        address _addressWon,
        uint256 _state,
        string _IPFS
    );
    event Vote(
        address indexed _electionAddress,
        address indexed _candidateAddress,
        address indexed _userAddress
    );

    event StartElection(address indexed _electionAddress);
    event EndElection(address indexed _electionAddress);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(admin == msg.sender, "Require admin access");
        _;
    }

    function createElection(
        string memory _nameElection,
        string memory _descriptionelection,
        string memory _IPFS
    ) public onlyAdmin {
        _electionId.increment();
        uint256 idNumber = _electionId.current();
        Election election = new Election(
            idNumber,
            address(this),
            _nameElection,
            _descriptionelection,
            _IPFS,
            0
        );
        address newElectionAddress = address(election);
        electionAddress.push(newElectionAddress);
        emit CreateElection(
            idNumber,
            newElectionAddress,
            _nameElection,
            _descriptionelection,
            address(this),
            address(0),
            0,
            _IPFS
        );
    }

    function getElections() public view returns (ElectionModel[] memory) {
        ElectionModel[] memory elections = new ElectionModel[](
            electionAddress.length
        );
        for (uint i = 0; i < electionAddress.length; i++) {
            Election election = Election(electionAddress[i]);
            elections[i] = election.getElection();
        }
        return elections;
    }

    function vote(
        address _electionAddress,
        address _candidateAddress,
        address _userAddress
    ) public returns (bool) {
        Election election = Election(_electionAddress);
        election.vote(_candidateAddress, _userAddress);
        emit Vote(_electionAddress, _candidateAddress, _userAddress);
        return true;
    }

    function getElection(
        address _electionAddress
    ) public view returns (ElectionModel memory) {
        Election election = Election(_electionAddress);
        ElectionModel memory elections = election.getElection();
        return elections;
    }

    function addCandidate(
        address _electionAddress,
        address _candidateAddress,
        string memory _candidateName,
        string memory _candidateDescription,
        string memory _candidateIPFS
    ) public onlyAdmin {
        Candidate memory candidate = Candidate(
            0,
            _candidateAddress,
            _candidateName,
            _candidateDescription,
            _candidateIPFS,
            0
        );
        Election election = Election(_electionAddress);
        election.addCandidate(candidate);
        // emit AddCandidate()
    }

    function getWonElection(
        address _electionAddress
    ) public onlyAdmin returns (Candidate memory) {
        Election election = Election(_electionAddress);
        return election.getWonElection();
    }

    function getCandidates(
        address _electionAddress
    ) public view returns (Candidate[] memory) {
        Election election = Election(_electionAddress);
        return election.getCandidates();
    }

    function getCandidate(
        address _electionAddress,
        address _candidateAddress
    ) public view returns (Candidate memory) {
        Election election = Election(_electionAddress);
        return election.getCandidate(_candidateAddress);
    }

    function getUsers(
        address _electionAddress
    ) public view onlyAdmin returns (address[] memory) {
        Election election = Election(_electionAddress);
        return election.getUsers();
    }

    function startElection(address _electionAddress) public onlyAdmin {
        Election election = Election(_electionAddress);
        election.startElection();
        emit StartElection(_electionAddress);
    }

    function endElection(address _electionAddress) public onlyAdmin {
        Election election = Election(_electionAddress);
        election.endElection();
        emit EndElection(_electionAddress);
    }
}
