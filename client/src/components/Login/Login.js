import React from "react";
import { inputField } from "./fieldItems";
import "../Register/Register.css";

export default function Login() {
  return (
    <div className="regContainer">
      <h1>Sign In</h1>
      <form className="regForm">
        {inputField.map((items) => {
          return <input type={items.type} placeholder={items.placeHolder} />;
        })}
        <button type="submit">Log In</button>
      </form>
      <div className="alreadyAccount">
        <p>Not have an account?</p>
        <a href="/register"> Register</a>
      </div>
    </div>
  );
}
