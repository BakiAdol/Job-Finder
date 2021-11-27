import React, { useEffect, useState } from "react";
import JobCard from "../Job/JobCard";

export default function Jobs(props) {
  const uId = props.match.params.userId;
  const [jobs, setjobs] = useState([]);
  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("/myalljobs", {
      method: "POST",
      headers,
      body: JSON.stringify({
        jUserId: uId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setjobs(data);
      });
  }, []);
  return (
    <div>
      {jobs.map((items, pos) => {
        return (
          <JobCard
            key={pos}
            className="JobCard"
            jUserId={items.jUserId._id}
            jUserName={items.jUserId.uName}
            jPostDate={items.jPostDate}
            jDeadline={items.jDeadline}
            jTitle={items.jTitle}
            jDescription={items.jDescription}
            jImage={items.jImage}
            jCatagory={items.jCatagory}
            jApplicants={items.jApplicants}
            isMyJob={true}
            jobId={items._id}
          />
        );
      })}
    </div>
  );
}
