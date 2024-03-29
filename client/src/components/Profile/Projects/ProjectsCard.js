import React, { useState } from "react";
import "./Projects.css";

export default function ProjectsCard({ project }) {
  const [show, setShow] = useState(false);
  return (
    <div className="profileCard">
      <button onClick={() => setShow(!show)} className="profileCardTItle">
        {project.pName}
      </button>
      {show ? (
        <div className="profileCardDescription">{project.pDetails}</div>
      ) : (
        <></>
      )}
    </div>
  );
}
