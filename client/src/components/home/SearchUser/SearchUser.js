import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import "./SearchUser.css";

export default function SearchUser() {
  const { loggedIn } = useContext(AuthContext);
  const [inputName, setinputName] = useState("");
  const [searchUser, setsearchUser] = useState([]);
  const searchUserButton = async (e) => {
    e.preventDefault();

    if (loggedIn.isLoggedIn === false) {
      return alert("Login First!");
    }

    const res = await fetch("/searchuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputName,
      }),
    });
    const data = await res.json();
    setsearchUser(data);
  };
  return (
    <div className="searchUserBox">
      <form>
        <input
          type="text"
          name="username"
          value={inputName}
          placeholder="Search User"
          onChange={(e) => setinputName(e.target.value)}
        />
        <button onClick={searchUserButton}>Search</button>
      </form>
      <div
        className="showSearchUsers"
        style={
          searchUser.length > 0 ? { padding: "0.5rem 0.5rem 0 0.5rem" } : {}
        }
      >
        {searchUser.map((item, pos) => {
          return (
            <div key={pos} className="searchUser">
              <img src="/images/profilepic/blnkpropic.gif" alt="" />
              <Link to={`/profile/${item._id}`} className="searchUserName">
                {item.uName}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
