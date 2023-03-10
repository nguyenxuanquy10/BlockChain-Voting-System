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
        string indexed _from,
        address indexed _to,
        uint256 _value
    );

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
        electionAddress.push(address(election));
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
    }

    function endElection(address _electionAddress) public onlyAdmin {
        Election election = Election(_electionAddress);
        election.endElection();
    }
}
