import React, { useState } from "react";
import CataItems from "./CataItems";
import "./JobPost.css";

export default function JobPost() {
  const [jobInp, setjobInp] = useState({
    jTitle: "",
    jDescription: "",
    jImage: "",
    jCatagory: CataItems,
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
      if (value == 0) return 0;
      updateNewState(value, 1);
    } else setjobInp({ ...jobInp, [name]: value });
  };

  const removeCata = (pos) => {
    updateNewState(pos, 0);
  };

  const submitJobPost = (e) => {
    e.preventDefault();
    let data = { ...jobInp };
    let cata = [];
    data.jCatagory.forEach((item, pos) => {
      if (item.isSelected === 1) cata.push(item.iName);
    });
    data.jCatagory = cata;
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
        />
        <textarea
          name="jDescription"
          value={jobInp.jDescription}
          placeholder="Job Description"
          onChange={hangleInput}
        />
        <div className="imgAndCataContainer">
          <div className="imgContainer">
            <label>
              Upload Image
              <input name="jImage" type="file" onChange={hangleInput} />
            </label>
            <img src="" alt="" />
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

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}
