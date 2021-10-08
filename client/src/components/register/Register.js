import React from "react";
import { inputField, radioField } from "./fieldItems";
import "./Register.css";

export default function Register() {
  return (
    <div className="regContainer">
      <h1>Registration</h1>
      <form className="regForm">
        {inputField.map((items) => {
          return <input type={items.type} placeholder={items.placeHolder} />;
        })}
        <br />
        <div className="genderContainer">
          {radioField.map((items) => {
            return (
              <>
                <input type="radio" id={items.id} value={items.rName} />
                <label for={items.id}>{items.rName}</label>
              </>
            );
          })}
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="alreadyAccount">
        <p>Already have an account?</p>
        <a href="/login"> Sign In</a>
      </div>
    </div>
  );
}
