import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { MdHouse, MdLanguage, MdSchool } from "react-icons/md";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Bio(props) {
  const { userInfo, getUserDetails } = useContext(UserContext);
  const [dataLoading, setDataLoading] = useState(true);
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
      <div className="bioContainer">
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
        <p>{userInfo.uGender}</p>
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
      </div>
    </IconContext.Provider>
  );
}
