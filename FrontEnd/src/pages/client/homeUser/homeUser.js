import React, { useContext } from "react";
import "./homeUser.css";
import NavBar from "../../../compoments/client/narbar/navbar";
import ListCardElection from "../../../compoments/client/listCardElection/listCardElection";
const HomeUser = () => {
  return (
    <div>
      <NavBar></NavBar>
      <ListCardElection></ListCardElection>
    </div>
  );
};

export default HomeUser;
