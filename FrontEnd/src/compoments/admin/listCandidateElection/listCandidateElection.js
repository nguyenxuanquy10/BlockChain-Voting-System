import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import MainContract from "../../../contract/Main.json";
import MainAddress from "../../../contract/mainAddress.json";
import { ElecionContext } from "../../../App";
import NarBarAdmin from "../narbarAdmin/narbarAdmin";
import "./listCandidateElection.css";
const ListCandidateElection = () => {
  const { AddressMainContract } = useContext(ElecionContext);
  const { electionAddress } = useParams();
  const [listCandidate, setListCandidate] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [nameCandidate, setNameCandidate] = useState();
  const [addressCandidate, setAddressCandidate] = useState();
  const [descriptionCandidate, setDescriptionCandidate] = useState();
  const [ipfs, setIpfs] = useState();
  useEffect(() => {
    const getList = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const InsMain = new ethers.Contract(
        AddressMainContract.main,
        MainContract.abi,
        provider
      );
      const candidates = await InsMain.getCandidates(electionAddress);
      setListCandidate(candidates);
    };
    getList();
  }, []);
  const handleShowForm = () => {
    if (!isAdd) {
      setIsAdd(true);
    } else setIsAdd(false);
  };
  const handleCandidateAddress = (e) => {
    setAddressCandidate(e.target.value);
  };
  const handleCandidateName = (e) => {
    setNameCandidate(e.target.value);
  };
  const handleCandidateDescription = (e) => {
    setDescriptionCandidate(e.target.value);
  };
  const handleCandidateIPFS = (e) => {
    setIpfs(e.target.value);
  };
  const handleAddCandidate = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const singer = await provider.getSigner();
    const InsMain = new ethers.Contract(
      MainAddress.main,
      MainContract.abi,
      singer
    );
    console.log("electionAddress", electionAddress);

    await InsMain.addCandidate(
      electionAddress,
      addressCandidate,
      nameCandidate,
      descriptionCandidate,
      ipfs
    );
    alert("Create candidate success");
  };
  return (
    <div>
      <NarBarAdmin></NarBarAdmin>
      <div className="container-home">
        <div className="create-election-candidate">
          <h3>Election Address : {electionAddress}</h3>
          <button onClick={handleShowForm}>
            {isAdd ? <h3>Cancel add</h3> : <h3>Add candidate</h3>}
          </button>
        </div>
        {isAdd && (
          <div className="form-createInput">
            <div className="login-page">
              <h1>Add Candidate</h1>

              <div className="form">
                <form className="login-form">
                  <input
                    type="text"
                    placeholder="Address Candidate"
                    onChange={handleCandidateAddress}
                  />
                  <input
                    type="text"
                    placeholder="Name Candidate"
                    onChange={handleCandidateName}
                  />
                  <input
                    type="text"
                    placeholder="Description Candidate"
                    onChange={handleCandidateDescription}
                  />
                  <input
                    type="text"
                    placeholder="IPFS Candidate"
                    onChange={handleCandidateIPFS}
                  />
                  <button onClick={handleAddCandidate}>Create</button>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="container-election">
          {listCandidate.length ? (
            <table className="flat-table">
              <tbody>
                <tr>
                  <th>CandidateImgage</th>
                  <th>CandidateId</th>
                  <th>CandidateAddress</th>
                  <th>CandidateName</th>
                  <th>CandidateDescription</th>
                  <th>NumberVoted</th>
                </tr>

                {listCandidate.map((election, index) => {
                  return (
                    <tr>
                      <td>
                        <img
                          className="card-image"
                          src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no"
                        />
                      </td>
                      <td>{Number(election[0])}</td>
                      <td>{election[1]}</td>
                      <td>{election[2]}</td>
                      <td>{election[3]}</td>
                      <td>{Number(election.numberVoted)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>None Candidate </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ListCandidateElection;
