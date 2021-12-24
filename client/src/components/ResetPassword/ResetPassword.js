import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ResetPassword.css";

export default function ResetPassword(props) {
  const history = useHistory();
  const { uEmail, realVeryfyCode } = props.location.state;
  const [message, setmessage] = useState("sdfdsf dsfsdf");
  const [openNewPass, setopenNewPass] = useState(false);
  const [reInfo, setreInfo] = useState({
    userNewpass: "",
    userConpass: "",
    userCode: "",
  });
  const handleInput = (event) => {
    let { name, value } = event.target;
    setreInfo({ ...reInfo, [name]: value });
  };

  const sendNewPassword = async () => {
    const uPassword = reInfo.userNewpass;
    const res = await fetch("/resetuserpassword", {
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
      setmessage(data.error);
    } else {
      history.push("/login");
    }
  };
  return (
    <div className="regContainer resetPassBody">
      <p>{message}</p>
      {openNewPass ? (
        <div className="resetNewPassBLock">
          <input
            type="text"
            name="userNewpass"
            placeholder="Enter new password"
            onChange={handleInput}
            value={reInfo.userNewpass}
          />
          <input
            type="text"
            name="userConpass"
            placeholder="Confirm new password"
            onChange={handleInput}
            value={reInfo.userConpass}
          />
          <button
            onClick={() => {
              if (reInfo.userConpass !== reInfo.userNewpass)
                return setmessage("Password didn't match!");
              sendNewPassword();
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="resetPassCodeBlock">
          <p>Verificaiton code send to {uEmail}</p>
          <input
            name="userCode"
            type="text"
            placeholder="Enter verificaiton code"
            onChange={handleInput}
            value={reInfo.userCode}
          />
          <button
            onClick={() => {
              if (reInfo.userCode.toString() !== realVeryfyCode.toString())
                return setmessage("Didn't match verification code!");
              setopenNewPass(true);
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
