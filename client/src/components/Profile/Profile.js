import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Applies from "./Applies";
import Bio from "./Bio/Bio";
import Experiences from "./Experience/Experiences";
import Jobs from "./Jobs";
import "./Profile.css";
import profileLinkItem from "./profileLinkItem";
import Projects from "./Projects/Projects";

export default function Profile(props) {
  const uId = props.match.params.userId;
  const currentUrl = props.match.url;

  const { userInfo, getUserDetails } = useContext(UserContext);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function fetchUserInfo(userId) {
      await getUserDetails(userId);
      setDataLoading(false);
    }
    fetchUserInfo(uId);
  }, [uId]);
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
          <Bio {...props} userId={uId} />
        </div>
        <div className="profileRightBody">
          <div className="profileLinks">
            {profileLinkItem.map((item, pos) => {
              return (
                <Link
                  className="linkItem"
                  key={pos}
                  to={currentUrl + item.link}
                >
                  {item.linkName}
                </Link>
              );
            })}
          </div>
          <Switch>
            <Route
              exact
              path="/profile/:userId/"
              render={() => <Projects {...props} userId={uId} />}
            />
            <Route
              path={"/profile/:userId/experiences"}
              render={() => <Experiences {...props} userId={uId} />}
            />
            <Route path="/profile/:userId/jobs" component={Jobs} />
            <Route path="/profile/:userId/applies" component={Applies} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
