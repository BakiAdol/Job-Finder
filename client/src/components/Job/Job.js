import React, { useEffect, useState } from "react";
import "./Job.css";
import JobCard from "./JobCard";

export default function Job() {
  const [jobs, setjobs] = useState([]);
  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("/alljobs", { headers })
      .then((response) => response.json())
      .then((data) => {
        setjobs(data);
      });
  }, []);
  return (
    <div className="jobBody minHeight80vh">
      <div className="jobCards">
        {jobs.map((items, pos) => {
          return (
            <JobCard
              key={pos}
              className="JobCard"
              jPostId={items._id}
              jUserId={items.jUserId._id}
              jUserName={items.jUserId.uName}
              jPostDate={items.jPostDate}
              jDeadline={items.jDeadline}
              jTitle={items.jTitle}
              jDescription={items.jDescription}
              jImage={items.jImage}
              jCatagory={items.jCatagory}
              jApplicants={items.jApplicants}
            />
          );
        })}
      </div>
    </div>
  );
}
