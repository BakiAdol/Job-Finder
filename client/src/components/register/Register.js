import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { inputField, radioField } from "./fieldItems";
import "./Register.css";

export default function Register() {
  const [errorShow, seterrorShow] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  const history = useHistory();
  const [regData, setRegData] = useState({
    uName: "",
    uEmail: "",
    uPassword: "",
    uConfirmPassword: "",
    uGender: "Male",
  });
  const handleInput = (event) => {
    let { name, value } = event.target;
    setRegData({ ...regData, [name]: value });
  };
  const submitRegData = async (e) => {
    e.preventDefault();
    const { uName, uEmail, uPassword, uConfirmPassword, uGender } = regData;
    const uPropic = "blnkpropic.gif";
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uName,
        uPropic,
        uEmail,
        uPassword,
        uConfirmPassword,
        uGender,
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
    <div className="minHeight80vh">
      <div className="regContainer">
        <h1>Registration</h1>
        <p className="errorShow">{errorShow}</p>
        <form method="POST" className="regForm" onSubmit={submitRegData}>
          {inputField.map((items, pos) => {
            return (
              <input
                name={items.value}
                key={items.value}
                value={regData.value}
                onChange={handleInput}
                type={items.type}
                placeholder={items.placeHolder}
              />
            );
          })}
          <br />
          <div className="genderContainer">
            {radioField.map((items, pos) => {
              return (
                <div key={pos}>
                  <input
                    type="radio"
                    name="uGender"
                    id={items.id}
                    onChange={handleInput}
                    value={items.rName}
                    checked={regData.uGender === items.rName}
                  />
                  <label htmlFor={items.id}>{items.rName}</label>
                </div>
              );
            })}
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="alreadyAccount">
          <p>Already have an account?</p>
          <Link to="/login"> Sign In</Link>
        </div>
      </div>
    </div>
  );
}
