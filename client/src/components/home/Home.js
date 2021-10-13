import React from "react";
import "./Home.css";
import JobPost from "./JobPost/JobPost";

export default function Home() {
  return (
    <div>
      <div className="jobPostContainer">
        <JobPost />
      </div>
    </div>
  );
}
