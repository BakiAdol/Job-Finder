import React, { useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../context/AuthContext";
import "./Logout.css";

export default function Logout() {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  async function logOuttt() {
    await fetch("/logout");
    await getLoggedIn();
    history.push("/");
  }
  return (
    <button className="logoutBtn" onClick={logOuttt}>
      Log Out
    </button>
  );
}
