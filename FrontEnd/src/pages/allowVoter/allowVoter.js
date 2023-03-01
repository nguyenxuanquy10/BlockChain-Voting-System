import React, { useState, useEffect, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { VotingContext } from "../../app";
import "./allowVoter.module.css";
import Image1 from "../../assest/images/candidate-naruto.jpg";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const AllowVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });
  const { uploadToIPFS } = useContext(VotingContext);
  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIPFS(acceptedFil[0]);
    setFileUrl(url);
  });
  return <div>Allow Voters</div>;
};
export default AllowVoters;
