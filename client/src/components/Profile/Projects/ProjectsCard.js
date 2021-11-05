import React, { useState } from "react";
import "./Projects.css";

export default function ProjectsCard(props) {
  const [show, setShow] = useState(false);
  return (
    <div className="projectBody">
      <button onClick={() => setShow(!show)} className="projectNameButton">
        {props.pName}
      </button>

      {show ? (
        <>
          {/* <p>{props.pDescription}</p> */}
          <input type="text" value={props.pDescription} disabled={true} />
          <div className="projectSmallButtonDiv">
            <button className="projectSmallButton">Edit Project</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
