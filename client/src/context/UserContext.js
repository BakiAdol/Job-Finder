import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();
let uId;
function UserContextProvider(props) {
  const [userInfo, setuserInfo] = useState({});
  async function getUserDetails(userId) {
    uId = userId;
    console.log("context ", userId);
    const res = await fetch("/user/userdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    if (res.status === 422) {
      // push home
    } else {
      const resInfo = await res.json();
      setuserInfo({ ...resInfo.uInfo });
    }
  }

  useEffect(() => {
    getUserDetails(uId);
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, getUserDetails }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
