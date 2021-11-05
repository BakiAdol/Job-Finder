import React from "react";
import { Link } from "react-router-dom";
import "./JobCard.css";

export default function JobCard(props) {
  return (
    <div className="jobCard">
      <div className="jobCardHeader">
        <div className="userNameShow">
          <Link to="#">{props.uUser}</Link>
          <p>{props.date}</p>
        </div>

        <div
          className="dateShow"
          style={{
            backgroundColor:
              props.deadline < new Date().toLocaleDateString()
                ? "#FC522D"
                : "#0CB82B",
          }}
        >
          <p>Deadline</p>
          <p>{props.deadline}</p>
        </div>
      </div>

      <h2 className="titleShow">{props.jobTitle}</h2>
      <p className="desShow">{props.jobDescription}</p>
      <img src={props.image} alt="" />
      <div className="jobCata">
        {props.jobCatagory.map((items, pos) => {
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
