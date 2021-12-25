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
    jCatagory: [],
  });

  const hangleInput = (event) => {
    let { name, value } = event.target;

    if (name === "jCatagory") {
      const obj = { ...jobInp };
      const cata = [...obj.jCatagory];
      if (value !== "Catagory" && cata.includes(value) === false) {
        cata.push(value);
        setjobInp({ ...jobInp, jCatagory: cata });
      }
    } else setjobInp({ ...jobInp, [name]: value });
  };

  const removeCata = (val) => {
    const obj = { ...jobInp };
    let cata = [...obj.jCatagory];
    cata = cata.filter(function (item) {
      return item !== val;
    });
    setjobInp({ ...jobInp, jCatagory: cata });
  };

  const submitJobPost = async (e) => {
    e.preventDefault();
    if (loggedIn.isLoggedIn === false) {
      return alert("Login in first!");
    }

    if (jobInp.jCatagory.length === 0)
      return alert("Add at lest one catagory!");

    const formData = new FormData();
    const jImg = jobInp.jImage;
    let imurl = "";
    const jUserId = loggedIn.rootUserId;
    const jDeadline = jobInp.jDeadline;
    const jTitle = jobInp.jTitle;
    const jDescription = jobInp.jDescription;
    const jCatagory = [...jobInp.jCatagory];

    if (jImg) {
      console.log("aiche");
      formData.append("file", jImg);
      formData.append("upload_preset", "jobfinderimage");
      formData.append("cloud_name", "datfgzevr");

      fetch("https://api.cloudinary.com/v1_1/datfgzevr/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const jImage = data.url;
          fetch("/postnewjob", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jUserId,
              jDeadline,
              jTitle,
              jDescription,
              jImage,
              jCatagory,
            }),
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
              jCatagory: [],
            });
            setjobImage(undefined);
          });
        })
        .catch((err) => {
          return alert("Server error!");
        });
    } else {
      fetch("/postnewjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jUserId,
          jDeadline,
          jTitle,
          jDescription,
          jCatagory,
        }),
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
          jCatagory: [],
        });
        setjobImage(undefined);
      });
    }
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
                accept="image/*"
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
                  <option key={pos} value={items}>
                    {items}
                  </option>
                );
              })}
            </select>

            {jobInp.jCatagory.map((items, pos) => {
              return (
                <div className="selectedItemShow" key={pos}>
                  <p>{items}</p>
                  <span onClick={() => removeCata(items)}>X</span>
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
