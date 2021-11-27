import React, { useEffect, useState } from "react";
import JobCard from "../Job/JobCard";
import ViewPDF from "../ViewPDF/ViewPDF";
import "./FilterApplicants.css";

export default function FilterApplicants(props) {
  const jUserId = props.match.params.jUserId;
  const jobId = props.match.params.jobId;
  const [job, setjob] = useState(undefined);
  const [showThisCv, setshowThisCv] = useState(false);

  const getThisJobs = () => {
    const headers = { "Content-Type": "application/json" };
    fetch("/getthisjob", {
      method: "POST",
      headers,
      body: JSON.stringify({ jUserId, jobId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setjob(data);
      });
  };

  useEffect(() => {
    getThisJobs();
  }, []);
  if (job === undefined) return "";
  return (
    <div className="filterApplicantBody">
      <div className="thisJobShow">
        <JobCard
          className="JobCard"
          jUserId={job.jUserId._id}
          jUserName={job.jUserId.uName}
          jPostDate={job.jPostDate}
          jDeadline={job.jDeadline}
          jTitle={job.jTitle}
          jDescription={job.jDescription}
          jImage={job.jImage}
          jCatagory={job.jCatagory}
          jApplicants={job.jApplicants}
        />
      </div>
      <div className="filterShow">
        <div className="applicantList">
          {job.jApplicants.map((item, pos) => {
            return (
              <div key={pos}>
                <button onClick={() => setshowThisCv(true)}>CV</button>
                {showThisCv === true && (
                  <ViewPDF
                    cvUrl={`/files/jobapplicv/${item.jUserCvName}`}
                    exitViewPdf={setshowThisCv}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
