import React, { useContext, useRouter, useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";

// Internal import
// import { VotingContext } from "./contract/Voter";
import "./app.module.css";
import Card from "../src/components/Card/Card";
import NavBar from "./components/NavBar/NavBar";
const App = () => {
  // const router = useRouter();
  const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateLength, setCandidateLength] = useState("");
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);
  // end of candidate data
  const [error, setError] = useState("");
  const highestVote = [];
  //-- voter setion
  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLenght] = useState("");
  const [voterAddress, setVoterAddress] = useState([]);
  // -- upload to ipfs voter image
  const uploadIPFS = async (file) => {
    try {
      const added = client.add({ content: file });
      const url = `https://ipfs.infura.io.ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError(error);
    }
  };

  // my code
  const [account, setAccount] = useState();
  const connectToWallet = async () => {
    if (window.ethereum) {
      // Do something
      const accountLogin = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accountLogin[0]);
      console.log(account);
    } else {
      alert("install metamask extension!!");
    }
  };
  return (
    <div>
      <NavBar></NavBar>
      Home
      <button onClick={connectToWallet}>Connect to metamask</button>
      {account && <h1>{account}</h1>}
      <h1 className="test">TTT</h1>
    </div>
  );
};

export default App;
