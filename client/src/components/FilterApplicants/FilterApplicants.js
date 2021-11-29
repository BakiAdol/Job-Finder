import React, { useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useHistory } from "react-router";
import JobCard from "../Job/JobCard";
import ViewPDF from "../ViewPDF/ViewPDF";
import "./FilterApplicants.css";

export default function FilterApplicants(props) {
  const jUserId = props.match.params.jUserId;
  const jobId = props.match.params.jobId;

  const history = useHistory();

  const [job, setjob] = useState(undefined);
  const [showThisCv, setshowThisCv] = useState(false);
  const [cvUrl, setcvUrl] = useState(undefined);
  const [cataInput, setcataInput] = useState("");
  const [filterCatagory, setfilterCatagory] = useState([]);

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
    <div className="filterApplicantBody minHeight90vh">
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
        <div className="preferenceBody">
          <div className="inputPref">
            <input
              type="text"
              value={cataInput}
              placeholder="Enter Prefernece"
              onChange={(e) => setcataInput(e.target.value)}
            />
            <button
              className="primaryButton"
              onClick={() => {
                if (
                  cataInput !== "" &&
                  filterCatagory.includes(cataInput) === false
                )
                  setfilterCatagory([...filterCatagory, cataInput]);
              }}
            >
              Filter
            </button>
          </div>
          <div className="showPreferences">
            {filterCatagory.map((item, pos) => {
              return (
                <div key={pos} className="singlePref">
                  <p>{item}</p>
                  <button
                    onClick={() => {
                      let cata = filterCatagory;
                      cata = cata.filter((tmp) => {
                        return tmp !== item;
                      });
                      setfilterCatagory(cata);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="applicantList">
          {job.jApplicants.length === 0 ? (
            <p>No Applicants!</p>
          ) : (
            <p>Applicants</p>
          )}
          <div className="filterAllApplicantsCata">
            <button className="primaryButton">All</button>
            <button className="primaryButton">Marked</button>
            <button className="primaryButton">Unmarked</button>
          </div>
          {job.jApplicants.map((item, pos) => {
            console.log(item);
            return (
              <div key={pos}>
                <div className="singleApplicantBody">
                  <button
                    className="primaryButton"
                    onClick={() => {
                      setshowThisCv(true);
                      setcvUrl(`/files/jobapplicv/${item.jUserCvName}`);
                    }}
                  >
                    CV
                  </button>
                  <button
                    className="primaryButton"
                    onClick={() =>
                      history.push(`/profile/${item.jApplicantsId}`)
                    }
                  >
                    Profile
                  </button>
                  {/* <p>X</p> */}
                  {item.jUserMarked ? (
                    <MdCheckBox
                      style={{ fontSize: "1.5rem", color: "green" }}
                    />
                  ) : (
                    <MdCheckBoxOutlineBlank
                      style={{ fontSize: "1.5rem", color: "gray" }}
                    />
                  )}
                </div>
                {showThisCv === true && (
                  <ViewPDF cvUrl={cvUrl} exitViewPdf={setshowThisCv} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
