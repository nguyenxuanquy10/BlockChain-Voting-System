import React, { useState, useEffect, useContext } from "react";
import CardElection from "../cardElection/cardElection";
import { ethers } from "ethers";
import MainContract from "../../../contract/Main.json";
import "./listCardElection.css";
import { ElecionContext } from "../../../App";
const ListCardElection = () => {
  const { AddressMainContract } = useContext(ElecionContext);
  const [listElection, setListElection] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const InsMain = new ethers.Contract(
        AddressMainContract.main,
        MainContract.abi,
        provider
      );
      const listElections = await InsMain.getElections();
      setListElection(listElections);
    };
    getList();
  }, []);

  return (
    <div className="container">
      <h1 className="title">List Election</h1>
      <div className="listcard">
        {listElection.length ? (
          listElection.map((listElection, index) => (
            <div className="containerCard">
              <CardElection election={listElection}></CardElection>
            </div>
          ))
        ) : (
          <div>None Election</div>
        )}
      </div>
    </div>
  );
};

export default ListCardElection;
