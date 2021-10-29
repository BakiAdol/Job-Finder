import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedin] = useState(undefined);
  async function getLoggedIn() {
    let loggedInRes = await fetch("/loggedin");
    loggedInRes = await loggedInRes.json();
    setLoggedin(loggedInRes.logRes);
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
