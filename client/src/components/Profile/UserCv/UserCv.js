import React, { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import UserContext from "../../../context/UserContext";
import "./UserCv.css";

export default function UserCv({ userId }) {
  const [isUpdateCv, setisUpdateCv] = useState(false);
  const [cvName, setcvName] = useState("");
  const { loggedIn } = useContext(AuthContext);
  const { userInfo, getUserDetails } = useContext(UserContext);

  const cvUpdateController = (e) => {
    e.preventDefault();
    if (cvName === "") return alert("Upload your cv!");

    const _id = loggedIn.rootUserId;
    const uCv = cvName;

    fetch("/profileupdate/cv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        uCv,
      }),
    }).then((res) => {
      if (res.status === 422) {
        return alert("server errror!");
      }
      getUserDetails(loggedIn.rootUserId);
      alert("CV update Successfull!");
      setisUpdateCv(false);
    });
  };

  return (
    <div className="userCvBody">
      {isUpdateCv === false ? (
        <div
          className="bioCvBody"
          style={
            loggedIn.rootUserId === userId
              ? { justifyContent: "space-between" }
              : { justifyContent: "center" }
          }
        >
          <button
            className="primaryButton"
            onClick={() => {
              if (!userInfo.uCv) return alert("Didn't have CV!");
              const win = window.open(userInfo.uCv, "_blank");
              // win.focus();
            }}
          >
            CV
          </button>
          {loggedIn.rootUserId === userId && (
            <button
              className="primaryButton"
              onClick={() => setisUpdateCv(true)}
            >
              Update CV
            </button>
          )}
        </div>
      ) : (
        <div className="userUpdateCvBody">
          <input
            type="text"
            placeholder="Upload CV link"
            value={cvName}
            onChange={(e) => setcvName(e.target.value)}
          />

          <div className="cvupSaveCancelBtn">
            <button className="primaryButton" onClick={cvUpdateController}>
              Update
            </button>
            <button
              className="primaryButton"
              style={{ backgroundColor: "red" }}
              onClick={() => setisUpdateCv(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
