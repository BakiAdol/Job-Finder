import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UserContext from "../../context/UserContext";
import Applie from "./Applie/Applie";
import Bio from "./Bio/Bio";
import Experiences from "./Experience/Experiences";
import Jobs from "./Jobs";
import "./Profile.css";
import profileLinkItem from "./profileLinkItem";
import Projects from "./Projects/Projects";
import UpdateProPic from "./UpdateProPic/UpdateProPic";
import UserCv from "./UserCv/UserCv";

export default function Profile(props) {
  const { loggedIn } = useContext(AuthContext);
  const uId = props.match.params.userId;
  const currentUrl = props.match.url;

  const { userInfo, getUserDetails } = useContext(UserContext);
  const [dataLoading, setDataLoading] = useState(true);

  const [updatePropic, setupdatePropic] = useState(false);

  useEffect(() => {
    async function fetchUserInfo(userId) {
      await getUserDetails(userId);
      setDataLoading(false);
    }
    fetchUserInfo(uId);
  }, [uId]);
  if (dataLoading === true) return <></>;
  return (
    <div className="profileContainer minHeight80vh">
      <div className="profileHeader">
        <div className="propic">
          {updatePropic ? (
            <UpdateProPic
              rootUserId={loggedIn.rootUserId}
              setupdatePropic={setupdatePropic}
            />
          ) : (
            ""
          )}

          <img src={`/images/profilepic/${userInfo.uPropic}`} alt="" />
          {loggedIn.rootUserId === uId ? (
            <button
              className="primaryButton"
              onClick={() => setupdatePropic(true)}
            >
              Update
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="nameEmail">
          <p>{userInfo.uName}</p>
          <p>{userInfo.uEmail}</p>
        </div>
      </div>
      <div className="profileBody">
        <div className="profileLeftBody">
          <Bio {...props} userId={uId} />
          <UserCv userId={uId} />
        </div>
        <div className="profileRightBody">
          <div className="profileLinks">
            {profileLinkItem.map((item, pos) => {
              return loggedIn.rootUserId === uId ||
                item.linkName === "Projects" ||
                item.linkName === "Experiences" ? (
                <Link
                  className="linkItem"
                  key={pos}
                  to={currentUrl + item.link}
                >
                  {item.linkName}
                </Link>
              ) : (
                ""
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

            {loggedIn.rootUserId === uId && (
              <>
                <Route path="/profile/:userId/jobs" component={Jobs} />
                <Route path="/profile/:userId/applies" component={Applie} />
              </>
            )}
          </Switch>
        </div>
      </div>
    </div>
  );
}
