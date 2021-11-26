import React from "react";
import "./Home.css";
import JobPost from "./JobPost/JobPost";
import SearchUser from "./SearchUser/SearchUser";

export default function Home() {
  return (
    <div className="homebody minHeight80vh">
      <div className="searchUserContainer">
        <SearchUser />
      </div>
      <div className="jobPostContainer">
        <JobPost />
      </div>
    </div>
  );
}
