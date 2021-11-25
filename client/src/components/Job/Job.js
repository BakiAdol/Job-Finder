import React, { useEffect, useState } from "react";
import CataItems from "../Home/JobPost/CataItems";
import "./Job.css";
import JobCard from "./JobCard";

export default function Job() {
  const [jobs, setjobs] = useState([]);
  const [jobCata, setjobCata] = useState([]);

  const getAllJobs = () => {
    const headers = { "Content-Type": "application/json" };
    fetch("/alljobs", {
      method: "POST",
      headers,
      body: JSON.stringify({ jobCata }),
    })
      .then((response) => response.json())
      .then((data) => {
        setjobs(data);
      });
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const addCatagorites = (e) => {
    let { value } = e.target;
    if (value !== "Catagory" && jobCata.includes(value) === false) {
      setjobCata((arr) => [...arr, value]);
    }
  };

  const removeCatagorites = (val) => {
    setjobCata(
      [...jobCata].filter(function (item) {
        return item !== val;
      })
    );
  };

  return (
    <div className="jobBody minHeight80vh">
      <div className="jobSearchBody">
        <h3>Search Jobs</h3>
        <div className="cataContainer">
          <select name="jCatagory" onChange={addCatagorites}>
            {CataItems.map((items, pos) => {
              return (
                <option key={pos} value={items.iName}>
                  {items.iName}
                </option>
              );
            })}
          </select>

          {jobCata.map((items, pos) => {
            return (
              <div className="selectCataShow" key={pos}>
                <p>{items}</p>
                <span onClick={() => removeCatagorites(items)}>X</span>
              </div>
            );
          })}

          <button className="primaryButton" onClick={() => getAllJobs()}>
            Search
          </button>
        </div>
      </div>
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
