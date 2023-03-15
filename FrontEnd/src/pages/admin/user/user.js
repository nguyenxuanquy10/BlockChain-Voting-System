import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./listUser.css";
const ListCardElectionAdmin = () => {
  const [listUser, setListUser] = useState([]);
  const [isCreate, setIsCreate] = useState(false);

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
  const handleStatusElection = async (e, addressElection, status) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const singer = provider.getSigner();
    const InsMain = new ethers.Contract(
      MainAddress.main,
      MainContract.abi,
      singer
    );
    const state = e.target.value;

    setStatusElection(state);
    if (state == "Start") {
      await InsMain.startElection(addressElection);
    } else if (state == "End") {
      await InsMain.endElection(addressElection);
    }
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
      setListElection(listElections);
    };
    getList();
    console.log(listElection);
  }, []);
  console.log(listElection);
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
              {listElection.map((election, index) => {
                let status = election.state;
                const linkViewCandidate = `/candidate/${election[1]}`;
                if (status == 0) {
                  statusElection = "Create";
                } else if (status == 1) {
                  statusElection = "Start";
                } else if (status == 2) {
                  statusElection = "Voting";
                }
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
                    <td>
                      <select
                        value={statusElection}
                        onChange={(e) =>
                          handleStatusElection(e, election[1], statusElection)
                        }
                      >
                        <option value="Create">Create</option>
                        <option value="Start">Start</option>
                        <option value="End">End</option>
                      </select>
                    </td>
                    <td>{election[2]}</td>
                    <td>{election[3]}</td>
                    <td>
                      <Link to={linkViewCandidate}>ViewAll</Link> -{" "}
                      {Number(election[7])}
                    </td>
                    <td>{Number(election[5])}</td>
                  </tr>
                );
              })}
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
