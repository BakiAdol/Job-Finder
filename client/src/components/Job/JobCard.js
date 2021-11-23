import React from "react";
import { Link } from "react-router-dom";
import "./JobCard.css";

export default function JobCard(props) {
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
          <Link to="#">{props.jUserName}</Link>
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
      {props.jImage !== "" ? <img src={props.jImage} alt="" /> : ""}
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
