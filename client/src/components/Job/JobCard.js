import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import JobApply from "./JobApply/JobApply";
import "./JobCard.css";

export default function JobCard(props) {
  const [isApply, setisApply] = useState(false);
  const { loggedIn } = useContext(AuthContext);
  function DMYconvert(strDate) {
    return (
      strDate.getDate() + "-" + strDate.getMonth() + "-" + strDate.getFullYear()
    );
  }
  const postDate = DMYconvert(new Date(props.jPostDate));
  const postDeadline = DMYconvert(new Date(props.jDeadline));

  const applyForJob = async () => {
    if (loggedIn.isLoggedIn === false) {
      return alert("Login in first");
    }
    const res = await fetch("/appliforjob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedIn.rootUserId,
        jobId: props.jPostId,
      }),
    });
    const data = await res.json();
    alert(data.msg);
  };

  const history = useHistory();

  return (
    <div className="jobCard">
      <div className="jobCardHeader">
        <div className="userNameShow">
          <Link to={`/profile/${props.jUserId}`}>{props.jUserName}</Link>
          {props.jDeadline > new Date() ||
          loggedIn.rootUserId === props.jUserId ||
          props.alreadyApplie ? (
            ""
          ) : (
            <button className="primaryButton" onClick={() => setisApply(true)}>
              Apply Now
            </button>
          )}
          {isApply && (
            <JobApply setisApply={setisApply} jobId={props.jPostId} />
          )}
        </div>

        <div className="dateShow">
          <p>{postDate}</p>
          <p>
            Deadline:{" "}
            <span
              style={{
                color:
                  postDeadline < new Date().toLocaleDateString()
                    ? "#FC522D"
                    : "#0CB82B",
              }}
            >
              {postDeadline}
            </span>
          </p>
        </div>
      </div>

      <h2 className="titleShow">{props.jTitle}</h2>
      <p className="desShow">{props.jDescription}</p>
      {props.jImage !== "" ? (
        <img src={`/images/jobimages/${props.jImage}`} alt="" />
      ) : (
        ""
      )}
      <div className="jobCata">
        {props.jCatagory.map((items, pos) => {
          return (
            <p className="jobCataItems" key={pos}>
              {items}
            </p>
          );
        })}
      </div>
      {props.isMyJob === true && (
        <button
          className="primaryButton filterJobCardBtn"
          onClick={() => {
            history.push(
              `/user/${props.jUserId}/filterapplicants/${props.jobId}`
            );
          }}
        >
          Filter CV
        </button>
      )}
    </div>
  );
}
