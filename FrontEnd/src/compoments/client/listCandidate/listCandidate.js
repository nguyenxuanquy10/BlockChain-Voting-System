import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import "./listCandidate.css";
import MainContract from "../../../contract/Main.json";
import MainAddress from "../../../contract/mainAddress.json";
import CardCandidate from "../cardCandidate/cardCandidate";
const ListCandidate = () => {
  const [listCandidate, setListCandidate] = useState([]);
  const { electionAddress } = useParams();
  useEffect(() => {
    const getList = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const InsMain = new ethers.Contract(
        MainAddress.main,
        MainContract.abi,
        provider
      );
      const candidates = await InsMain.getCandidates(electionAddress);
      setListCandidate(candidates);
    };
    getList();
  }, []);
  return (
    <div className="container">
      <h1 className="title-address">Address Election: {electionAddress}</h1>
      <h1 className="title">List Candidate</h1>
      <div className="listcard">
        {listCandidate.length ? (
          listCandidate.map((candidates, index) => (
            <div className="containerCard">
              <CardCandidate candidate={candidates}></CardCandidate>
            </div>
          ))
        ) : (
          <div>None Election</div>
        )}
      </div>
    </div>
  );
};

export default ListCandidate;
