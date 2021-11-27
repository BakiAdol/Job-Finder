import React, { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import "./JobApply.css";

export default function JobApply({ setisApply, jobId }) {
  const { loggedIn } = useContext(AuthContext);
  const [jApplicantsCv, setjApplicantsCv] = useState();
  const [cvName, setcvName] = useState("");
  const jobApplyControler = (e) => {
    e.preventDefault();
    if (cvName === "") return alert("Upload your CV");
    if (loggedIn.isLoggedIn === false) {
      return alert("Login in first");
    }
    setcvName("");

    const formData = new FormData();
    formData.append("jApplicantsCv", jApplicantsCv);
    formData.append("jobId", jobId);
    formData.append("jApplicantsId", loggedIn.rootUserId);

    fetch("/appliforjob", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.status === 422) {
        return alert("server errror!");
      }
      if (res.status === 300) {
        return alert("You already apply!");
      }
      alert("Job Appli Successfull!");
      setisApply(false);
    });
  };
  return (
    <div className="jobApplyBody">
      <div className="jobApplyContainer">
        <label className="primaryButton">
          Upload CV
          <input
            name="jImage"
            type="file"
            onChange={(e) => {
              setjApplicantsCv(e.target.files[0]);
              setcvName(e.target.files[0].name);
            }}
          />
        </label>
        {cvName !== "" && <p>{cvName}</p>}
        <div className="applySaveCancelBtn">
          <button className="primaryButton" onClick={jobApplyControler}>
            Apply
          </button>
          <button className="primaryButton" onClick={() => setisApply(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
