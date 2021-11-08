import React, { useContext, useEffect, useState } from "react";
import { MdAdd, MdClear } from "react-icons/md";
import AuthContext from "../../../context/AuthContext";
import UserContext from "../../../context/UserContext";
import ExperienceCard from "./ExperienceCard";

export default function Experiences(props) {
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

  const [editExp, seteditExp] = useState(userInfo.uExperiences);

  const [editExperience, seteditExperience] = useState(false);

  const updateExperiences = async () => {
    const uExperiences = editExp;
    const userId = userInfo._id;
    await fetch("/profileupdate/experiences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        uExperiences,
      }),
    });
    await getUserDetails(userId);
    seteditExperience(false);
  };

  // new experiences
  const [newExp, setnewExp] = useState({
    eName: "",
    eDetails: "",
  });

  if (dataLoading === true) return <></>;

  return (
    <div>
      {editExperience ? (
        <div className="editProfilesBody">
          <h3 className="editProTitle">Edit Experiences</h3>
          {editExp.map((item, pos) => {
            return (
              <div className="editProItemBody" key={pos}>
                <div className="editTitleRemoveRow">
                  <input
                    type="text"
                    value={editExp[pos].eName}
                    placeholder="Experience Title"
                    onChange={(e) => {
                      const newEditExp = [...editExp];
                      newEditExp[pos].eName = e.target.value;
                      seteditExp(newEditExp);
                    }}
                  />

                  <div
                    className="profileIconButton textColorRed"
                    onClick={() => {
                      seteditExp(editExp.filter((tem, p) => p !== pos));
                    }}
                  >
                    <MdClear />
                  </div>
                </div>
                <textarea
                  value={editExp[pos].eDetails}
                  placeholder="Experience Details"
                  onChange={(e) => {
                    const newEditExp = [...editExp];
                    newEditExp[pos].eDetails = e.target.value;
                    seteditExp(newEditExp);
                  }}
                />
              </div>
            );
          })}
          <p className="profileMiniLeftTitle">Add new experiences</p>
          <div className="editProItemBody">
            <div className="editTitleRemoveRow">
              <input
                type="text"
                value={newExp.eName}
                placeholder="Experience Title"
                onChange={(e) => {
                  const tmpEx = { ...newExp };
                  tmpEx.eName = e.target.value;
                  setnewExp(tmpEx);
                }}
              />

              <div
                className="profileIconButton textColorGreen"
                onClick={() => {
                  if (newExp.eName !== "" && newExp.eDetails !== "") {
                    seteditExp([...editExp, newExp]);
                    setnewExp({
                      eName: "",
                      eDetails: "",
                    });
                  }
                }}
              >
                <MdAdd />
              </div>
            </div>
            <textarea
              value={newExp.eDetails}
              placeholder="Experience Details"
              onChange={(e) => {
                const tmpEx = { ...newExp };
                tmpEx.eDetails = e.target.value;
                setnewExp(tmpEx);
              }}
            />
          </div>
          <div className="addCancleEditProItems">
            <button className="primaryButton" onClick={updateExperiences}>
              Save Experiences
            </button>
            <button
              className="primaryButton"
              onClick={() => seteditExperience(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {userInfo.uExperiences.map((item, pos) => {
            return <ExperienceCard experience={item} key={pos} />;
          })}

          {loggedIn.rootUserId === uId && (
            <div className="profileSingleCenterButton">
              <button
                className="primaryButton"
                onClick={() => seteditExperience(true)}
              >
                Add or Edit Experiences
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
