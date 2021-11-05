import React from "react";
import JobCard from "../Job/JobCard";
import jobItems from "../Job/jobItems";

export default function Applies() {
  return (
    <div>
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
            deadline={items.deadline}
          />
        );
      })}
    </div>
  );
}
