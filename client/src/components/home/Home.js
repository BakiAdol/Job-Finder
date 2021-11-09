import React from "react";
import "./Home.css";
import JobPost from "./JobPost/JobPost";

export default function Home() {
  return (
    <div className="minHeight80vh">
      <div className="jobPostContainer">
        <JobPost />
      </div>
    </div>
  );
}
