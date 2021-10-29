import React from "react";
import "./App";
import { AuthContextProvider } from "./context/AuthContext";
import Router from "./router/Router";

const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
};

export default App;
