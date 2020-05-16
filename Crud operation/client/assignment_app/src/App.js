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
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Home = () => {};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Drawer>
          <Switch>
            {/* switch provides kind of typical switch case alternatives similar to regular ones. just providing options which path to called for a key/ component */}
            <Route component={Assignments} path={"/Assignments"} />
            <Route component={Students} path={"/Students"} />
            <Route
              render={() => {
                return <h1>"Hello to my default route"</h1>;
              }}
              path={"/"}
            />
          </Switch>
        </Drawer>
      </BrowserRouter>
    );
  }
}
export default App;
