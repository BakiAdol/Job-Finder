import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Logout from "../Logout/Logout";
import "./Navbar.css";
import NavLinkItems from "./NavLInkItems";

export default function Navbar() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <div className="navBody">
      <div className="NavContainer">
        <div className="navLogo">JF</div>
        <div className="links">
          {NavLinkItems.map((item, pos) => {
            return (
              <NavLink
                exact
                activeClassName="navActive"
                to={item.link}
                className="navLink"
                key={pos}
              >
                {item.linkName}
              </NavLink>
            );
          })}

          {loggedIn.isLoggedIn === true && (
            <NavLink
              exact
              activeClassName="navActive"
              to="/profile"
              className="navLink"
            >
              Profile
            </NavLink>
          )}
        </div>
        <div className="navJoin">
          {loggedIn.isLoggedIn === false && (
            <NavLink className="joinLink" to="/register">
              Join
            </NavLink>
          )}

          {loggedIn.isLoggedIn === true && <Logout />}
        </div>
      </div>
    </div>
  );
}
