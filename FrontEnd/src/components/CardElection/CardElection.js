import React from "react";
import "./cardelection.css";
const CardElection = () => {
  return (
    <div className="container">
      <div className="card">
        <img
          src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no"
          alt="Person"
          className="card__image"
        />
        <div className="grid-container">
          <div className="grid-child-followers">Election American</div>
        </div>
        <div className="grid-container-1">
          <div className="grid-child-posts">Status :</div>

          <div className="grid-child-followers">Continue</div>
        </div>
        <button className="btn draw-border">Join</button>
      </div>
    </div>
  );
};

export default CardElection;
