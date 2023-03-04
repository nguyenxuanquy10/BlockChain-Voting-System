import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ElecionContext } from "../../../App";
import "./navbar.css";
const NavBar = () => {
  const { connectToWallet, account } = useContext(ElecionContext);
  return (
    <div className="menu">
      <div className="home">
        <Link className="span-text" to="/home">
          Home
        </Link>
      </div>

      <div className="register">
        <Link className="span-text" to="/register">
          Register
        </Link>
      </div>

      <div className="connect" onClick={connectToWallet}>
        {account ? (
          <div className="account">
            <span className="span-text">
              {account.substring(0, 4)}...{account.substring(39, 42)}
            </span>
          </div>
        ) : (
          <span className="span-text">Connect</span>
        )}
      </div>
    </div>
  );
};

export default NavBar;
