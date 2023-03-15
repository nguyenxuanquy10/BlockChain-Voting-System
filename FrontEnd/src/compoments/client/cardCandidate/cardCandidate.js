import React from "react";
import axios from "axios";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import MainContract from "../../../contract/Main.json";
import MainAddress from "../../../contract/mainAddress.json";
import "./cardCandidate.css";
const CardCandidate = (props) => {
  const { electionAddress } = useParams();
  const Candidate = props.candidate;
  let status = "Create";
  if (Candidate.state == 1) {
    status = "Voting";
  } else if (Candidate.state == 2) {
    status = "End";
  }
  const candidateAddress = Candidate.candidateAddress;

  const handleSendElectionAddressToBackEnd = async () => {
    axios
      .post("http://localhost:3333/api/v1/admin/recordCandidateAddress", {
        electionAddress: electionAddress,
      })
      .then((message) => {
        console.log(message);
      });
  };
  const handleVoteCandidate = async (e, electionAddress, canidateAddress) => {
    e.preventDefault();
    await handleSendElectionAddressToBackEnd();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const singer = provider.getSigner();
    const userAddress = singer.getAddress();
    const InsMain = new ethers.Contract(
      MainAddress.main,
      MainContract.abi,
      singer
    );
    await InsMain.vote(electionAddress, candidateAddress, userAddress);
  };
  return (
    <div className="container-card">
      <div className="card-candidate">
        <img
          src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no"
          alt="Person"
          className="card__image"
        />
        <div className="grid-container">
          <div className="grid-child-followers">ID- {Number(Candidate[0])}</div>
        </div>
        <div className="grid-container">
          <div className="grid-child-followers">
            Address-{candidateAddress.substring(0, 4)}...
            {candidateAddress.substring(39, 42)}
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-child-followers">
            Name- {Candidate.candidateName}
          </div>
        </div>
        <div className="grid-container-1">
          <div className="grid-child-posts">Description - </div>

          <div className="grid-child-followers">
            {Candidate.candidateDescription}
          </div>
        </div>
        <button
          className="btn draw-border"
          onClick={(e) =>
            handleVoteCandidate(e, electionAddress, candidateAddress)
          }
        >
          Voting
        </button>
      </div>
    </div>
  );
};

export default CardCandidate;
