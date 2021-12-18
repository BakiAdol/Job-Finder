import React, { useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useHistory } from "react-router";
import CataItems from "../home/JobPost/CataItems";
import JobCard from "../Job/JobCard";
import ViewPDF from "../ViewPDF/ViewPDF";
import "./FilterApplicants.css";

export default function FilterApplicants(props) {
  const jUserId = props.match.params.jUserId;
  const jobId = props.match.params.jobId;
  const history = useHistory();

  const [whoToPrint, setwhoToPrint] = useState(0);

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

  const markUnmarkApplicants = (applicantsId, didMark) => {
    let allApplicants = [...job.jApplicants];
    allApplicants.map((val) => {
      if (val.jApplicantsId === applicantsId) {
        val.jUserMarked = didMark;
      }
      return val;
    });

    const headers = { "Content-Type": "application/json" };
    fetch("/updateapplicantsmark", {
      method: "POST",
      headers,
      body: JSON.stringify({ jobId, allApplicants }),
    }).then(() => {
      getThisJobs();
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
          {/* <div className="inputPref">
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
          </div> */}
          {/* <div className="showPreferences">
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
          </div> */}

          <div className="cataContainer">
            <select
              name="jCatagory"
              onChange={(e) => {
                const cataVal = e.target.value;
                if (
                  cataVal !== "Catagory" &&
                  filterCatagory.includes(cataVal) === false
                ) {
                  setfilterCatagory([...filterCatagory, cataVal]);
                }
              }}
            >
              {CataItems.map((items, pos) => {
                return (
                  <option key={pos} value={items}>
                    {items}
                  </option>
                );
              })}
            </select>

            {filterCatagory.map((items, pos) => {
              return (
                <div className="selectedItemShow" key={pos}>
                  <p>{items}</p>
                  <span
                    onClick={() => {
                      let cataI = [...filterCatagory];
                      cataI = cataI.filter((itm) => {
                        return itm !== items;
                      });
                      setfilterCatagory([...cataI]);
                    }}
                  >
                    X
                  </span>
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
            <button className="primaryButton" onClick={() => setwhoToPrint(0)}>
              All
            </button>
            <button className="primaryButton" onClick={() => setwhoToPrint(1)}>
              Marked
            </button>
            <button className="primaryButton" onClick={() => setwhoToPrint(2)}>
              Unmarked
            </button>
          </div>
          {job.jApplicants.map((item, pos) => {
            if (whoToPrint === 1 && item.jUserMarked !== true) return "";
            if (whoToPrint === 2 && item.jUserMarked === true) return "";

            let isInFilter = filterCatagory.length === 0;
            for (let i = 0, len = filterCatagory.length; i < len; i++) {
              if (
                item.jApplicantKeywords.includes(filterCatagory[i]) === true
              ) {
                isInFilter = true;
              }
            }
            if (isInFilter === false) return "";

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
                      onClick={() => {
                        markUnmarkApplicants(item.jApplicantsId, false);
                      }}
                    />
                  ) : (
                    <MdCheckBoxOutlineBlank
                      style={{ fontSize: "1.5rem", color: "gray" }}
                      onClick={() => {
                        markUnmarkApplicants(item.jApplicantsId, true);
                      }}
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
