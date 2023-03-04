import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import MainContract from "../../../contract/Main.json";
import MainAddress from "../../../contract/mainAddress.json";
import "./listCardElectionAdmin.css";
import { ElecionContext } from "../../../App";
const ListCardElectionAdmin = () => {
  const { AddressMainContract } = useContext(ElecionContext);
  const [listElection, setListElection] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [nameElection, setNameElection] = useState("");
  const [descriptionElection, setDescriptionElection] = useState("");
  const [linkIPFS, setLinkIPFS] = useState("");

  const handleShowForm = () => {
    if (!isCreate) {
      setIsCreate(true);
    } else setIsCreate(false);
  };
  const handleName = (e) => {
    setNameElection(e.target.value);
  };
  const handleDescription = (e) => {
    setDescriptionElection(e.target.value);
  };
  const handleLinkIPFS = (e) => {
    setLinkIPFS(e.target.value);
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const singer = await provider.getSigner();
    const InsMain = new ethers.Contract(
      MainAddress.main,
      MainContract.abi,
      singer
    );
    await InsMain.createElection(nameElection, descriptionElection, linkIPFS);
    alert("success create new eleciton");
  };
  useEffect(() => {
    const getList = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const InsMain = new ethers.Contract(
        AddressMainContract.main,
        MainContract.abi,
        provider
      );
      const listElections = await InsMain.getElections();
      console.log(listElection);
      setListElection(listElections);
    };
    getList();
  }, []);
  return (
    <div className="container-home">
      <div className="create-election">
        <button onClick={handleShowForm}>
          {isCreate ? <h3>Cancel create</h3> : <h3>Create</h3>}
        </button>
      </div>
      {isCreate && (
        <div className="form-createInput">
          <div className="login-page">
            <h1>Create Election</h1>

            <div className="form">
              <form className="login-form">
                <input
                  type="text"
                  placeholder="Name Election"
                  onChange={handleName}
                />
                <input
                  type="text"
                  placeholder="Description Election"
                  onChange={handleDescription}
                />
                <input
                  type="text"
                  placeholder="Link image"
                  onChange={handleLinkIPFS}
                />
                <button onClick={handleCreate}>Create</button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="container-election">
        {listElection.length ? (
          <table className="flat-table">
            <tbody>
              <tr>
                <th>Image</th>
                <th>ElectionId</th>
                <th>Address</th>
                <th>Status</th>
                <th>Name</th>
                <th>Description</th>
                <th>NumberOfCandidate</th>
                <th>Result</th>
              </tr>
              {listElection.map((election, index) => (
                <tr>
                  <td>
                    <img
                      className="card-image"
                      src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no"
                    />
                  </td>
                  <td>electionid</td>
                  <td>Address</td>
                  <td>Name</td>
                  <td>Description</td>
                  <td>
                    <select onChange="">
                      <option value="Create">Create</option>
                      <option value="Voting">Voting</option>
                      <option value="Closing">Closing</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td>NUmber</td>
                  <td>Resusl</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>None Election </div>
        )}
      </div>
    </div>
  );
};

export default ListCardElectionAdmin;
