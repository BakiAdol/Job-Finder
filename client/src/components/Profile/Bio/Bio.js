import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { MdHouse, MdLanguage, MdPerson, MdSchool } from "react-icons/md";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import UserContext from "../../../context/UserContext";
import "./Bio.css";
import EditBio from "./EditBio";

export default function Bio(props) {
  const { loggedIn } = useContext(AuthContext);
  const { userInfo, getUserDetails } = useContext(UserContext);
  const [dataLoading, setDataLoading] = useState(true);
  const [editBio, setEditBio] = useState(false);
  useEffect(() => {
    async function fetchUserInfo(userId) {
      await getUserDetails(userId);
      setDataLoading(false);
    }

    fetchUserInfo(props.userId);
  }, []);

  if (dataLoading === true) return <></>;

  return (
    <IconContext.Provider value={{ className: "bioIcons" }}>
      {editBio ? (
        <EditBio userInfo={userInfo} setEditBio={setEditBio} />
      ) : (
        <div className="bioContainer">
          <h3 className="profileBioTitle">Bio</h3>
          {userInfo.uEducations.map((item, pos) => {
            return (
              <div className="bioRowsBlock" key={pos}>
                <div className="bioIconsBody">
                  <MdSchool />
                </div>
                <p>{item}</p>
              </div>
            );
          })}
          {userInfo.uAddress.map((item, pos) => {
            return (
              <div className="bioRowsBlock" key={pos}>
                <div className="bioIconsBody">
                  <MdHouse />
                </div>
                <p>{item}</p>
              </div>
            );
          })}
          <div className="bioRowsBlock">
            <div className="bioIconsBody">
              <MdPerson />
            </div>
            <p>{userInfo.uGender}</p>
          </div>

          {userInfo.uLinks.map((item, pos) => {
            return (
              <div className="bioRowsBlock bioRowsBlockLInks" key={pos}>
                <div className="bioIconsBody">
                  <MdLanguage />
                </div>
                <p>
                  <Link
                    to={{
                      pathname: "http://" + item.uLink,
                    }}
                    target="_blank"
                    className="bioRowsBlockLInks"
                  >
                    {item.uLinkName}
                  </Link>
                </p>
              </div>
            );
          })}
          <div className="cvContainer">CV</div>
          {loggedIn.rootUserId === props.userId && (
            <div className="width35p marginZeroAuto">
              <button
                className="primaryButton"
                onClick={() => setEditBio(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      )}
    </IconContext.Provider>
  );
}
