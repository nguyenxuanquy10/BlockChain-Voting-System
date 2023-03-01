import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client"; // this is recommended
// We import bootstrap here, but you can remove if you want
import "bootstrap/dist/css/bootstrap.css";
import App from "./app";
// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

const root = ReactDOM.createRoot(document.getElementById("root"));
//
// Test useContext
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
