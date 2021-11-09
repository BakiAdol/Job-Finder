import React from "react";
import "./Job.css";
import JobCard from "./JobCard";
import jobItems from "./jobItems";

export default function Job() {
  return (
    <div className="jobBody minHeight80vh">
      <div className="jobCards">
        {jobItems.map((items, pos) => {
          return (
            <JobCard
              key={pos}
              className="JobCard"
              uUser={items.uUser}
              date={items.date}
              jobTitle={items.jobTitle}
              jobDescription={items.jobDescription}
              image={items.image}
              jobCatagory={items.jobCatagory}
            />
          );
        })}
      </div>
    </div>
  );
}
