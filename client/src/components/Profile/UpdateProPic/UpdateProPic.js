import React, { useContext, useState } from "react";
import UserContext from "../../../context/UserContext";
import "./UpdateProPic.css";

export default function UpdateProPic({ rootUserId, setupdatePropic }) {
  const { getUserDetails } = useContext(UserContext);
  const [proPic, setProPic] = useState(undefined);
  const [uPropic, setuPropic] = useState();

  const updateProfilePic = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("uPropic", uPropic);
    formData.append("_id", rootUserId);
    fetch("/profileupdate/profilepic", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.status === 422) {
        return alert("server errror!");
      }
      getUserDetails(rootUserId);
      setupdatePropic(false);
      alert("Profile picture update Successfull!");
    });
  };
  return (
    <div className="updatePropiContainer">
      <div className="upPropicbody">
        <div className="proimgBody">
          {proPic === undefined ? "" : <img src={proPic} alt="" />}{" "}
        </div>
        <label>
          <input
            type="file"
            onChange={(e) => {
              setuPropic(e.target.files[0]);
              const imgurl = URL.createObjectURL(e.target.files[0]);
              setProPic(imgurl);
            }}
          />
          Upload Image
        </label>
        <div className="saveCancle">
          <button className="primaryButton" onClick={updateProfilePic}>
            Update
          </button>
          <button
            className="primaryButton"
            onClick={() => setupdatePropic(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
