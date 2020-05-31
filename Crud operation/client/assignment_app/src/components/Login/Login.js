import React, { useState, useEffect } from "react";
import TextField from "../TextField";
import Button from "@material-ui/core/Button";
import useStyles from "./Styles";
import { authenticateUser } from "../../utils/mockData";
import { useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";

const Login = () => {
  const classess = useStyles();
  let [userDetails, setUserDetails] = useState({ userName: "", password: "" });
  const history = useHistory();
  let [loginError, setLoginError] = useState("");

  // 2nd param is to behave as componentDidMount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      history.push("/");
    }
  }, []);
  const onSubmit = async () => {
    console.log("login called", userDetails);
    try {
      const authenticatedUser = await authenticateUser(
        userDetails.userName,
        userDetails.password
      );
      // console.log("Login.js->onSubmit->authenticatedUser", authenticatedUser);
      // console.log(
      //   "Login.js->onSubmit->localStorage.user",
      //   JSON.parse(localStorage.getItem("user"))
      // );
      history.push("/");
    } catch ({ error }) {
      setLoginError(error);
      console.log("Login.js->onSubmit->error", error);
    }
  };
  const onChange = (key, value) => {
    loginError && setLoginError("");
    setUserDetails({ ...userDetails, [key]: value });
  };
  //--4 App ->(login route) ----- level n
  //-----3 Login component ----- level n-1
  //-------2 TextField wrapper----------------level n-2
  //---------1 TextField material ui----------------level n-3
  // Leavel 1 called the upper level onChange for sending data back to upper level via e.target
  // Level 2 called the upper level handleChange for sending data back to upper level via name, value after splitting e.target.
  // Level 3 used the data back sent from lower level onChange for setting in the stateVariables (UserDetails) --- that will be finally used from local state vars

  return (
    <div className={classess.loginMainWrapper}>
      <div className={classess.loginWrapper}>
        <h1 className={classess.title}>Login page</h1>
        <TextField
          name={"userName"}
          className={classess.textField}
          label="User Name"
          onChange={onChange}
          value={userDetails.userName}
        />
        <TextField
          className={classess.textField}
          label="Password"
          name={"password"}
          onChange={onChange}
          value={userDetails.password}
        />
        {loginError && (
          <Chip
            label={loginError}
            color="secondary"
            variant="outlined"
            className={classess.errorChip}
          />
        )}
        <Button
          className={classess.loginButton}
          onClick={onSubmit}
          color="primary"
        >
          Login
        </Button>
      </div>
    </div>
  );
};
export default Login;
