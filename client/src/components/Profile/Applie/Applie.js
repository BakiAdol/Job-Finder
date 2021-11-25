import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext";
import JobCard from "../../Job/JobCard";

export default function Applie(props) {
  const { userInfo } = useContext(UserContext);
  const uId = props.match.params.userId;
  const [jobs, setjobs] = useState([]);
  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("/myallappliejob", {
      method: "POST",
      headers,
      body: JSON.stringify({
        uApplieJobs: userInfo.uJobApplies,
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
            jUserId={items.jUserId}
            jUserName="User Name"
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
  );
}
