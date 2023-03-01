import React from "react";
import "./navbar.css";
const NavBar = () => {
  return (
    <div>
      <h1>Lavalamp CSS Menu</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">Current</a>
        <a href="#">Result</a>
        <a href="#">Account</a>
        <div class="animation start-home"></div>
      </nav>
      <p>
        By <span>Patak</span>
      </p>
    </div>
  );
};

export default NavBar;
