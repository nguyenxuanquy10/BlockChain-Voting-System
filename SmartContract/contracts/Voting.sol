// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Voting {
    using Counters for Counters.Counter;
    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;
    address public votingOrganizer;

    // CANDIDATE FOR VOTING
    struct Candidate {
        uint256 candidateId;
        string age;
        string name;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs;
    }

    event CandidateCreate(
        uint256 indexed candidateId,
        string age,
        string name,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs
    );

    address[] public candidateAddress;
    mapping(address => Voter) public voters;
    mapping(address => Candidate) public candidates;
    address[] public votedVoters;
    address[] public votersAddress;

    struct Voter {
        uint256 voter_VoterId;
        string voter_Name;
        string voter_Image;
        address voter_Address;
        uint256 voter_Allowed;
        bool voter_Voted;
        uint256 voter_Vote;
        string voter_IPFS;
    }

    event VoterCreated(
        uint256 indexed voter_VoterId,
        string voter_Name,
        string voter_Image,
        address voter_Address,
        uint256 voter_Allowed,
        bool voter_Voted,
        uint256 voter_Vote,
        string voter_IPFS
    );

    //-- end of voter data
    constructor() {
        votingOrganizer = msg.sender;
    }

    function setCandidate(
        address _address,
        string memory _age,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        require(
            votingOrganizer == msg.sender,
            "Only voting Organizer can create voting"
        );
        _candidateId.increment();
        uint256 idNumber = _candidateId.current();
        Candidate storage candidate = candidates[_address];
        candidate.age = _age;
        candidate.name = _name;
        candidate.candidateId = idNumber;
        candidate.image = _image;
        candidate.ipfs = _ipfs;
        candidate._address = _address;

        candidateAddress.push(_address);

        emit CandidateCreate(
            idNumber,
            _age,
            _name,
            _image,
            candidate.voteCount,
            _address,
            _ipfs
        );
    }

    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    function getCandidateData(
        address _address
    )
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            string memory,
            uint256,
            string memory,
            address
        )
    {
        return (
            candidates[_address].age,
            candidates[_address].name,
            candidates[_address].candidateId,
            candidates[_address].image,
            candidates[_address].voteCount,
            candidates[_address].ipfs,
            candidates[_address]._address
        );
    }

    // voter section
    function voterRight(
        address _address,
        string memory _name,
        string memory _image,
        string memory _ifps
    ) public {
        require(
            votingOrganizer == msg.sender,
            "Onlye voting organized can create a voting"
        );
        _voterId.increment();
        uint256 idNumber = _voterId.current();

        Voter storage voter = voters[_address];
        require(voter.voter_Allowed == 0, "User can only vote once");

        voter.voter_Allowed = 1;
        voter.voter_Name = _name;
        voter.voter_Image = _image;
        voter.voter_IPFS = _ifps;
        voter.voter_Address = _address;
        voter.voter_VoterId = idNumber;
        voter.voter_Vote = 1000;
        voter.voter_Voted = false;
        votersAddress.push(_address);

        emit VoterCreated(
            idNumber,
            _name,
            _image,
            _address,
            voter.voter_Allowed,
            voter.voter_Voted,
            voter.voter_Vote,
            _ifps
        );
    }

    function vote(
        address _candidateAddress,
        uint256 _candidateVoteId
    ) external {
        Voter storage voter = voters[msg.sender];
        require(!voter.voter_Voted, "You have already voter");
        require(voter.voter_Allowed != 0, "You have no right to vote");

        voter.voter_Voted = true;
        voter.voter_Vote = _candidateVoteId;
        votedVoters.push(msg.sender);
        candidates[_candidateAddress].voteCount += voter.voter_Allowed;
    }

    function getVoterLength() public view returns (uint256) {
        return votersAddress.length;
    }

    function getVoterData(
        address _address
    )
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            address,
            string memory,
            uint256,
            bool
        )
    {
        return (
            voters[_address].voter_VoterId,
            voters[_address].voter_Name,
            voters[_address].voter_Image,
            voters[_address].voter_Address,
            voters[_address].voter_IPFS,
            voters[_address].voter_Allowed,
            voters[_address].voter_Voted
        );
    }

    function getVoteVoterList() public view returns (address[] memory) {
        return votedVoters;
    }

    function getVoterList() public view returns (address[] memory) {
        return votersAddress;
    }
}
