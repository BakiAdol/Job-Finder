import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FilterApplicants from "../components/FilterApplicants/FilterApplicants";
import Footer from "../components/Footer/Footer";
import Home from "../components/home/Home";
import Job from "../components/Job/Job";
import Login from "../components/Login/Login";
import Navbar from "../components/navbar/Navbar";
import Profile from "../components/Profile/Profile";
import Register from "../components/register/Register";
import AuthContext from "../context/AuthContext";
import { UserContextProvider } from "../context/UserContext";

export default function Router() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/jobs" component={Job} />

        {loggedIn.isLoggedIn === false && (
          <>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </>
        )}

        {loggedIn.isLoggedIn === true && (
          <>
            <Route
              path="/profile/:userId"
              render={(props) => (
                // <Profile {...props} userId={loggedIn.rootUserId} />

                <UserContextProvider>
                  <Profile {...props} />
                </UserContextProvider>
              )}
            />
            <Route
              exact
              path="/filterapplicants/:jUserId/:jobId"
              component={FilterApplicants}
            />
          </>
        )}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
