import React from "react";

import { VotingProvider } from "../../contract/Voter";
import NavBar from "../../components/NavBar/NavBar";
const MyApp = ({ Compenent, pageProps }) => {
  <VotingProvider>
    <div>
      <NavBar></NavBar>
      <Component {...pageProps}></Component>
    </div>
    ;
  </VotingProvider>;
};
export default MyApp;
