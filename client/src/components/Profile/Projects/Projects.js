import React, { useState } from "react";
import "./Projects.css";
import ProjectsCard from "./ProjectsCard";

export default function Projects() {
  const [projectList, setprojectList] = useState([
    {
      pName: "Project Name",
      pDescription: "Project Description",
    },
    {
      pName: "Project Name",
      pDescription: "Project Description",
    },
  ]);
  return (
    <div className="projectContainer">
      {projectList.map((item, pos) => {
        return (
          <ProjectsCard
            key={pos}
            pName={item.pName}
            pDescription={item.pDescription}
          />
        );
      })}
      <div className="projectSmallButtonDiv">
        <button className="projectSmallButton">Add Project</button>
      </div>
    </div>
  );
}
