import React from "react";
import { Link } from "react-router-dom";
import "./cardElection.css";
const CardElection = (props) => {
  const Election = props.election;
  console.log(Election.state);
  let status = "Create";
  if (Election.state == 1) {
    status = "Voting";
  } else if (Election.state == 2) {
    status = "End";
  }
  const urlDetail = "/detail/" + Election["electionAddress"];
  return (
    <div className="container-card">
      <div className="card">
        <img
          src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no"
          alt="Person"
          className="card__image"
        />
        <div className="grid-container">
          <div className="grid-child-followers">{Election[2]}</div>
        </div>
        <div className="grid-container-1">
          <div className="grid-child-posts">Status - </div>

          <div className="grid-child-followers">{status}</div>
        </div>
        <button className="btn draw-border">
          <Link to={urlDetail}>Voting</Link>
        </button>
      </div>
    </div>
  );
};

export default CardElection;
