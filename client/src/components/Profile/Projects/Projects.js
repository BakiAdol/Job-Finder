import React, { useContext, useEffect, useState } from "react";
import { MdAdd, MdClear } from "react-icons/md";
import AuthContext from "../../../context/AuthContext";
import UserContext from "../../../context/UserContext";
import "./Projects.css";
import ProjectsCard from "./ProjectsCard";

export default function Projects(props) {
  const uId = props.match.params.userId;
  const { loggedIn } = useContext(AuthContext);
  const { userInfo, getUserDetails } = useContext(UserContext);
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    async function fetchUserInfo(userId) {
      await getUserDetails(userId);
      setDataLoading(false);
    }

    fetchUserInfo(uId);
  }, [uId]);

  const [editPro, seteditPro] = useState(userInfo.uProjects);

  const [editProjects, setediteditProjects] = useState(false);

  const updateProjects = async () => {
    const uProjects = editPro;
    const userId = userInfo._id;
    await fetch("/profileupdate/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        uProjects,
      }),
    });
    await getUserDetails(userId);
    setediteditProjects(false);
  };

  // new project
  const [newPro, setnewPro] = useState({
    pName: "",
    pDetails: "",
  });

  if (dataLoading === true) return <></>;

  return (
    <div>
      {editProjects ? (
        <div className="editProfilesBody">
          <h3 className="editProTitle">Edit Project</h3>
          {editPro.map((item, pos) => {
            return (
              <div className="editProItemBody" key={pos}>
                <div className="editTitleRemoveRow">
                  <input
                    type="text"
                    value={editPro[pos].pName}
                    placeholder="Project Title"
                    onChange={(e) => {
                      const newEditPro = [...editPro];
                      newEditPro[pos].pName = e.target.value;
                      seteditPro(newEditPro);
                    }}
                  />

                  <div
                    className="profileIconButton textColorRed"
                    onClick={() => {
                      seteditPro(editPro.filter((tem, p) => p !== pos));
                    }}
                  >
                    <MdClear />
                  </div>
                </div>
                <textarea
                  value={editPro[pos].pDetails}
                  placeholder="Project Details"
                  onChange={(e) => {
                    const newEditPro = [...editPro];
                    newEditPro[pos].pDetails = e.target.value;
                    seteditPro(newEditPro);
                  }}
                />
              </div>
            );
          })}
          <p className="profileMiniLeftTitle">Add new Projects</p>
          <div className="editProItemBody">
            <div className="editTitleRemoveRow">
              <input
                type="text"
                value={newPro.pName}
                placeholder="Project Title"
                onChange={(e) => {
                  const tmpPro = { ...newPro };
                  tmpPro.pName = e.target.value;
                  setnewPro(tmpPro);
                }}
              />

              <div
                className="profileIconButton textColorGreen"
                onClick={() => {
                  if (newPro.pName !== "" && newPro.pDetails !== "") {
                    seteditPro([...editPro, newPro]);
                    setnewPro({
                      pName: "",
                      pDetails: "",
                    });
                  }
                }}
              >
                <MdAdd />
              </div>
            </div>
            <textarea
              value={newPro.pDetails}
              placeholder="Project Details"
              onChange={(e) => {
                const tmpPro = { ...newPro };
                tmpPro.pDetails = e.target.value;
                setnewPro(tmpPro);
              }}
            />
          </div>
          <div className="addCancleEditProItems">
            <button className="primaryButton" onClick={updateProjects}>
              Save Experiences
            </button>
            <button
              className="primaryButton"
              onClick={() => setediteditProjects(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {userInfo.uProjects.map((item, pos) => {
            return <ProjectsCard project={item} key={pos} />;
          })}

          {loggedIn.rootUserId === uId && (
            <div className="profileSingleCenterButton">
              <button
                className="primaryButton"
                onClick={() => setediteditProjects(true)}
              >
                Add or Edit Projects
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
