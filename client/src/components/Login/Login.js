import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "../Register/Register.css";
import { inputField } from "./fieldItems";

export default function Login() {
  const [errorShow, seterrorShow] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  const history = useHistory();
  const [logData, setLogData] = useState({
    uEmail: "",
    uPassword: "",
  });

  const handleInput = (event) => {
    let { name, value } = event.target;
    setLogData({ ...logData, [name]: value });
  };

  const submitLogData = async (e) => {
    e.preventDefault();
    const { uEmail, uPassword } = logData;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uEmail,
        uPassword,
      }),
    });
    const data = await res.json();
    if (res.status === 422) {
      seterrorShow(data.error);
    } else {
      await getLoggedIn();
      history.push("/");
    }
  };

  return (
    <div className="regContainer">
      <h1>Sign In</h1>
      <p className="errorShow">{errorShow}</p>
      <form className="regForm" method="POST" onSubmit={submitLogData}>
        {inputField.map((items, pos) => {
          return (
            <input
              name={items.value}
              key={pos}
              value={logData.value}
              onChange={handleInput}
              type={items.type}
              placeholder={items.placeHolder}
            />
          );
        })}
        <button type="submit">Log In</button>
      </form>
      <div className="alreadyAccount">
        <p>Not have an account?</p>
        <Link to="/register"> Register</Link>
      </div>
    </div>
  );
}
