import emailjs from "emailjs-com";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { inputField, radioField } from "./fieldItems";
import "./Register.css";

export default function Register() {
  const [errorShow, seterrorShow] = useState("");
  const [openVerify, setopenVerify] = useState(false);
  const [verifyCodeUser, setverifyCodeUser] = useState("");
  const [verifyCodeReal, setverifyCodeReal] = useState("");

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

  const insertNewUser = async (e) => {
    e.preventDefault();

    console.log(verifyCodeUser, verifyCodeReal);

    if (verifyCodeUser.toString() !== verifyCodeReal.toString())
      return alert("Wrond verification code!");
    setverifyCodeUser("");
    setverifyCodeReal("");

    setopenVerify(false);

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

  const submitRegData = async (e) => {
    e.preventDefault();
    setopenVerify(true);
    const { uEmail } = regData;
    const realVeryfyCode = Math.floor(100000 + Math.random() * 900000);
    setverifyCodeReal(realVeryfyCode.toString());

    emailjs
      .send(
        "service_a1n5x2g",
        "template_f2q74da",
        {
          from_name: "Job Finder",
          to_name: regData.uName,
          message: realVeryfyCode,
          reply_to: uEmail,
        },
        "user_fCWmqmpZpwJKwH4knjcoA"
      )
      .then(
        function (response) {},
        function (error) {
          alert("Server error!");
        }
      );
  };
  return (
    <div className="minHeight80vh">
      {openVerify && (
        <div className="getVerifyCodebody">
          <div className="verifyBLock">
            <p>Verification code send in {regData.uEmail}</p>
            <input
              type="text"
              placeholder="Enter your verification code"
              value={verifyCodeUser}
              onChange={(e) => setverifyCodeUser(e.target.value)}
            />
            <div className="veryBtns">
              <button onClick={insertNewUser}>Submit</button>
              <button onClick={() => setopenVerify(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
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
