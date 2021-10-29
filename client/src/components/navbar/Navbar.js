import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../Logout/Logout";
import "./Navbar.css";
import NavLinkItems from "./NavLInkItems";

export default function Navbar() {
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
        </div>
        <div className="navJoin">
          <NavLink className="joinLink" to="/register">
            Join
          </NavLink>
          <Logout />
        </div>
      </div>
    </div>
  );
}
