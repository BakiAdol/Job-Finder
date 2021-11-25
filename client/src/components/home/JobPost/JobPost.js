import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../../context/AuthContext";
import CataItems from "./CataItems";
import "./JobPost.css";

export default function JobPost() {
  const [jobImage, setjobImage] = useState(undefined);
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
    let cata = "";
    data.jCatagory.forEach((item, pos) => {
      if (item.isSelected === 1) {
        if (cata !== "") cata += ",";
        cata += item.iName;
      }
    });
    if (cata.length === 0) return alert("Add at lest one catagory!");

    const formData = new FormData();
    formData.append("jUserId", loggedIn.rootUserId);
    formData.append("jDeadline", jobInp.jDeadline);
    formData.append("jTitle", jobInp.jTitle);
    formData.append("jDescription", jobInp.jDescription);
    formData.append("jImage", jobInp.jImage);
    formData.append("jCatagory", cata);
    formData.append("jApplicants", jobInp.jApplicants);

    fetch("/postnewjob", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.status === 422) {
        return alert("server errror!");
      }
      alert("Job Post Successfull!");
      setjobInp({
        jUserId: "",
        jDeadline: new Date(),
        jTitle: "",
        jDescription: "",
        jImage: "",
        jCatagory: CataItems,
        jApplicants: [],
      });
      // return response.blob();
    });
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
              <input
                name="jImage"
                type="file"
                onChange={(e) => {
                  setjobInp({ ...jobInp, jImage: e.target.files[0] });
                  const imgurl = URL.createObjectURL(e.target.files[0]);
                  setjobImage(imgurl);
                }}
              />
            </label>
            {jobImage === undefined ? (
              ""
            ) : (
              <div>
                <img src={jobImage} alt="" />
                <p
                  onClick={() => {
                    setjobImage(undefined);
                    setjobInp({ ...jobInp, jImage: "" });
                  }}
                >
                  Cancel
                </p>
              </div>
            )}
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
