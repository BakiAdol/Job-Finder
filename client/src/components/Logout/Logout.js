import React from "react";
import { useHistory } from "react-router";
import "./Logout.css";

export default function Logout() {
  const history = useHistory();
  async function logOuttt() {
    await fetch("/logout");
    history.push("/");
  }
  return (
    <button className="logoutBtn" onClick={logOuttt}>
      Log Out
    </button>
  );
}
