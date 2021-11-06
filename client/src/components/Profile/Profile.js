import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Applies from "./Applies";
import Bio from "./Bio";
import Experiences from "./Experiences";
import Jobs from "./Jobs";
import "./Profile.css";
import profileLinkItem from "./profileLinkItem";
import Projects from "./Projects/Projects";

export default function Profile(props) {
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
    <div className="profileContainer">
      <div className="profileHeader">
        <img src={require("../../images/me.jpg").default} alt="" />
        <div className="nameEmail">
          <p>{userInfo.uName}</p>
          <p>{userInfo.uEmail}</p>
        </div>
      </div>
      <div className="profileBody">
        <div className="profileLeftBody">
          <Bio {...props} />
        </div>
        <div className="profileRightBody">
          <div className="profileLinks">
            {profileLinkItem.map((item, pos) => {
              return (
                <Link
                  className="linkItem"
                  key={pos}
                  to={props.match.path + item.link}
                >
                  {item.linkName}
                </Link>
              );
            })}
          </div>
          <Switch>
            <Route exact path={props.match.path + "/"} component={Projects} />
            <Route
              exact
              path={props.match.path + "/experiences"}
              component={Experiences}
            />
            <Route exact path={props.match.path + "/jobs"} component={Jobs} />
            <Route
              exact
              path={props.match.path + "/applies"}
              component={Applies}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}
