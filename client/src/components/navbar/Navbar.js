import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import NavLinkItems from "./NavLInkItems";

export default function Navbar() {
  return (
    <div className="navBody">
      <div className="NavContainer">
        <div className="navLogo">JF</div>
        <div className="links">
          {NavLinkItems.map((item) => {
            return (
              <NavLink
                exact
                activeClassName="navActive"
                to={item.link}
                className="navLink"
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
          ;
        </div>
      </div>
    </div>
  );
}
