import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import { publicRoutes, privateRoutes } from "./router/index";
import AddressMainContract from "./contract/mainAddress.json";
import "./app.css";
export const ElecionContext = React.createContext();
const App = () => {
  const [account, setAccount] = useState("");
  // const [sesstionListAddress, setSesstionListAddress] = useState([]);
  // useEffect(() => {
  //   const getListAddressSession = async () => {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = await provider.getSigner();
  //     const InsMain = new ethers.Contract(
  //       MainAddress.Main,
  //       MainContract,
  //       signer
  //     );
  //     const listAddressProduct = await InsMain.getAddressSession();
  //     setSesstionListAddress(listAddressProduct);
  //   };
  //   getListAddressSession();
  // }, []);
  const connectToWallet = async () => {
    if (window.ethereum) {
      // Do something
      const accountLogin = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accountLogin[0]);
      alert("Connected");
    } else {
      alert("install metamask extension!!");
    }
  };

  return (
    <div className="container-app">
      <Router>
        <ElecionContext.Provider
          value={{
            connectToWallet,
            account,
            AddressMainContract,
            // sesstionListAddress,
            // setSesstionListAddress,
          }}
        >
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Routes>
        </ElecionContext.Provider>
      </Router>
    </div>
  );
};
export default App;
