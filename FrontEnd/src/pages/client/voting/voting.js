import React, { useState, useEffect, useContext } from "react";
import "./voting.css";
import NavBar from "../../../compoments/client/narbar/navbar";
import ListCandidate from "../../../compoments/client/listCandidate/listCandidate";
const Voting = () => {
  return (
    <div>
      <NavBar></NavBar>
      <ListCandidate></ListCandidate>
    </div>
  );
};

export default Voting;
