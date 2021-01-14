import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Header from "./components/Header";
import NoRoute from "./components/NoRoute";
import { Container } from "react-bootstrap";
import PrivateRoute from "./components/PrivateRoute";
import User from "./components/User";
import Users from "./components/Users";
import Jokes from "./components/Jokes";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import GedInfo from "./components/GedInfo";
import facade from "./facade";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(facade.isLoggedIn());

  const tokenValidationCheck = useCallback(() => {
    if (isLoggedIn) {
      let currentStatus = facade.isLoggedIn();

      if (!currentStatus) {
        setLoggedIn(false);
        facade.logout();
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const interval = setInterval(() => {
      tokenValidationCheck();
    }, 1000); /* Every Second */
    return () => clearInterval(interval);
  }, [tokenValidationCheck]);

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        isAdmin={facade.isAdmin()}
      />

      <Container className="mt-5">
        <Switch>
          <Route exact path="/Eksamen/">
            <Home />
          </Route>
          <Route path="/Eksamen/ged">
            <GedInfo />
          </Route>
          <PrivateRoute
            path="/Eksamen/info/user"
            isLoggedIn={isLoggedIn}
            component={User}
          />
          <PrivateRoute
            path="/Eksamen/info/users"
            isLoggedIn={isLoggedIn}
            component={Users}
          />
          <PrivateRoute
            path="/Eksamen/jokes"
            isLoggedIn={isLoggedIn}
            component={Jokes}
          />
          <PrivateRoute
            path="/Eksamen/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
          />
          <Route path="/Eksamen/fanclub/login">
            <Login setLoggedIn={setLoggedIn} />
          </Route>
          <Route path="/Eksamen/fanclub/register">
            <Register setLoggedIn={setLoggedIn} />
          </Route>
          <Route>
            <NoRoute />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
