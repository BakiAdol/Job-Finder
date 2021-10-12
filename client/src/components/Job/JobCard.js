import React from "react";
import "./JobCard.css";

export default function JobCard(props) {
  return (
    <div className="jobCard">
      <a href="#">{props.uUser}</a>
      <p className="dateShow">{props.date}</p>
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
