import React, { useContext, useState } from "react";
import UserContext from "../../../context/UserContext";
import "./UpdateProPic.css";

export default function UpdateProPic({ rootUserId, setupdatePropic }) {
  const { getUserDetails } = useContext(UserContext);
  const [proPic, setProPic] = useState(undefined);
  const [uPropic, setuPropic] = useState();
  const [imgUrl, setimgUrl] = useState("");

  const updateProfilePic = async (e) => {
    e.preventDefault();

    const _id = rootUserId;

    const formData = new FormData();
    formData.append("file", uPropic);
    formData.append("upload_preset", "jobfinderimage");
    formData.append("cloud_name", "datfgzevr");

    fetch("https://api.cloudinary.com/v1_1/datfgzevr/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const imurl = data.url;
        console.log(_id, imurl);

        fetch("/profileupdate/profilepic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            uPropic: imurl,
          }),
        }).then((res) => {
          if (res.status === 422) {
            return alert("server errror!");
          }
          getUserDetails(rootUserId);
          setupdatePropic(false);
          alert("Profile picture update Successfull!");
        });
      })
      .catch((err) => {
        return alert("Server error!");
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
            accept="image/*"
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
            style={{ backgroundColor: "red" }}
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
