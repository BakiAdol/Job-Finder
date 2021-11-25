import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./JobCard.css";

export default function JobCard(props) {
  const { loggedIn } = useContext(AuthContext);
  function DMYconvert(strDate) {
    return (
      strDate.getDate() + "-" + strDate.getMonth() + "-" + strDate.getFullYear()
    );
  }
  const postDate = DMYconvert(new Date(props.jPostDate));
  const postDeadline = DMYconvert(new Date(props.jDeadline));
  return (
    <div className="jobCard">
      <div className="jobCardHeader">
        <div className="userNameShow">
          <Link to={`/profile/${props.jUserId}`}>{props.jUserName}</Link>
          {props.jDeadline > new Date() ||
          loggedIn.rootUserId === props.jUserId ? (
            ""
          ) : (
            <button className="primaryButton">Apply Now</button>
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
    </div>
  );
}
