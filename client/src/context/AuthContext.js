import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedin] = useState({
    isLoggedIn: undefined,
    rootUserId: undefined,
  });
  async function getLoggedIn() {
    let loggedInRes = await fetch("/loggedin");
    loggedInRes = await loggedInRes.json();
    const authInfo = {
      isLoggedIn: loggedInRes.isLoggedIn,
      rootUserId: loggedInRes.rootUserId,
    };
    setLoggedin(authInfo);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
