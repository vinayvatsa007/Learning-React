import React, { Component } from "react";
// import Table from './components/Table';
// import logo from './logo.svg';
import "./App.css";
// import { string } from 'prop-types';
// import { Tab } from '@material-ui/core';
// import Assignments from "./containers/Assignments/Assignments";
import Students from "./containers/Students/Student";
import Drawer from "./components/Drawer";
import Assignments from "./containers/Assignments/Assignments";
import { Route, Switch } from "react-router-dom";
import { useLocation } from "react-router";
import Login from "./components/Login/Login";
import withAuthentication from "../src/components/withAuthentication";

const Home = () => {};
const withDrawer = (location) => {
  if (location.pathname === "/Login") {
    return true;
  } else {
    return false;
  }
};

const App = () => {
  let location = useLocation();
  console.log(location);
  console.log("localStorage", localStorage);
  const isDrawer = withDrawer(location);
  return !isDrawer ? (
    <Drawer>
      <Switch>
        {/* switch provides kind of typical switch case alternatives similar to regular ones. just providing options which path to called for a key/ component */}
        <Route component={Assignments} path={"/Assignments"} />
        <Route component={Students} path={"/Students"} />
        {/* its a kind of inline rendering instead of giving component name we telling the route that we rendering a component by its definition/ inline definition */}
        <Route
          // render={withAuthentication(() => {
          //   return <h1>"Hello to my default route"</h1>;
          // })}
          render={() => {
            return <h1>"Hello to my default route"</h1>;
          }}
          path={"/"}
        />
        {/* <Route component={Login} path={"/Login"} /> */}
      </Switch>
    </Drawer>
  ) : (
    <Switch>
      <Route component={Login} path={"/Login"} />
    </Switch>
  );
};
export default App;
