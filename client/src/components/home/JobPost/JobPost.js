import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../../context/AuthContext";
import CataItems from "./CataItems";
import "./JobPost.css";

export default function JobPost() {
  const { loggedIn } = useContext(AuthContext);
  const [jobInp, setjobInp] = useState({
    jUserId: "",
    jDeadline: new Date(),
    jTitle: "",
    jDescription: "",
    jImage: "",
    jCatagory: CataItems,
    jApplicants: [],
  });

  function updateNewState(pos, val) {
    let obj = { ...jobInp };
    let items = [...obj.jCatagory];
    let item = { ...items[pos] };
    item.isSelected = val;
    items[pos] = item;
    obj.jCatagory = items;
    setjobInp(obj);
  }

  const hangleInput = (event) => {
    let { name, value } = event.target;
    if (name === "jCatagory") {
      if (value === 0) return 0;
      updateNewState(value, 1);
    } else setjobInp({ ...jobInp, [name]: value });
  };

  const removeCata = (pos) => {
    updateNewState(pos, 0);
  };

  const submitJobPost = async (e) => {
    e.preventDefault();
    if (loggedIn.isLoggedIn === false) {
      return alert("Login in first!");
    }
    let data = { ...jobInp };
    let cata = [];
    data.jCatagory.forEach((item, pos) => {
      if (item.isSelected === 1) cata.push(item.iName);
    });
    if (cata.length === 0) return alert("Add at lest one catagory!");
    data.jCatagory = cata;
    data.jUserId = loggedIn.rootUserId;
    const res = await fetch("/postnewjob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobInp),
    });

    const jsRes = await res.json();
    if (res.status === 422) {
      return alert("server errror!");
    }

    console.log(data);
  };

  return (
    <div className="jobPost">
      <form method="POST" onSubmit={submitJobPost}>
        <input
          name="jTitle"
          type="text"
          value={jobInp.jTitle}
          placeholder="Job Title"
          onChange={hangleInput}
          required
        />
        <textarea
          name="jDescription"
          value={jobInp.jDescription}
          placeholder="Job Description"
          onChange={hangleInput}
          required
        />
        <div className="imgAndCataContainer">
          <div className="imgContainer">
            <label>
              Upload Image
              <input name="jImage" type="file" onChange={hangleInput} />
            </label>
            <img src="" alt="" />
            <div className="datePickerContainer">
              <h2>Deadline</h2>
              <DatePicker
                className="deadlinePicker"
                dateFormat="dd/MM/yyyy"
                selected={jobInp.jDeadline}
                minDate={new Date()}
                onChange={(date) => {
                  let obj = { ...jobInp };
                  obj.jDeadline = date;
                  setjobInp(obj);
                }}
              />
            </div>
          </div>
          <div className="cataContainer">
            <select name="jCatagory" onChange={hangleInput}>
              {CataItems.map((items, pos) => {
                return (
                  <option key={pos} value={pos}>
                    {items.iName}
                  </option>
                );
              })}
            </select>

            {jobInp.jCatagory.map((items, pos) => {
              if (items.isSelected !== 1) return "";
              return (
                <div className="selectedItemShow" key={pos}>
                  <p>{items.iName}</p>
                  <span onClick={() => removeCata(pos)}>X</span>
                </div>
              );
            })}
          </div>
        </div>

        <button type="submit" className="jobPostBtn">
          Post Job
        </button>
      </form>
    </div>
  );
}
