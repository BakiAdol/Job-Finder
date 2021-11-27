import React, { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import UserContext from "../../../context/UserContext";
import ViewPDF from "../../ViewPDF/ViewPDF";
import "./UserCv.css";

export default function UserCv({ userId }) {
  const [isUpdateCv, setisUpdateCv] = useState(false);
  const [showMyCv, setshowMyCv] = useState(false);
  const [uCv, setuCv] = useState();
  const [cvName, setcvName] = useState("");
  const { loggedIn } = useContext(AuthContext);
  const { userInfo, getUserDetails } = useContext(UserContext);

  const cvUpdateController = (e) => {
    e.preventDefault();
    if (cvName === "") return alert("Upload your cv!");

    const formData = new FormData();
    formData.append("uCv", uCv);
    formData.append("_id", loggedIn.rootUserId);

    fetch("/profileupdate/cv", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.status === 422) {
        return alert("server errror!");
      }
      alert("CV update Successfull!");
      setisUpdateCv(false);
    });
    getUserDetails(loggedIn.rootUserId);
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
              setshowMyCv(true);
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
          <label className="primaryButton">
            Upload CV
            <input
              name="jImage"
              type="file"
              onChange={(e) => {
                setuCv(e.target.files[0]);
                setcvName(e.target.files[0].name);
              }}
            />
          </label>
          {cvName !== "" && <p>{cvName}</p>}
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

      {showMyCv && <ViewPDF cvUrl={userInfo.uCv} exitViewPdf={setshowMyCv} />}
    </div>
  );
}
