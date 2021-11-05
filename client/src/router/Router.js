import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import Job from "../components/Job/Job";
import Login from "../components/Login/Login";
import Navbar from "../components/Navbar/Navbar";
import Profile from "../components/Profile/Profile";
import Register from "../components/Register/Register";
import AuthContext from "../context/AuthContext";

export default function Router() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/jobs" component={Job} />

        {loggedIn === false && (
          <>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </>
        )}

        {loggedIn === true && <Route path="/profile" component={Profile} />}
      </Switch>
    </BrowserRouter>
  );
}
