import React, { useState, useEffect } from "react";
import { getItem } from "../utils/localStorage";
import { useHistory } from "react-router-dom";

const withAuthentication = (Component) => {
  // useEffect(() => {
  // }, []);
  // for traversing to a page 2 option either use history object or redirect the url.
  // HOC by definition takes a component as an parameter and returns a new / fresh component
  // thus we have to use a call back function instead of simply returning the component definition provided in param.
  // because that will not be treated as a fresh function.

  return (props) => {
    const history = useHistory();
    const user = getItem("user");

    if (!user) {
      history.push("/Login");
    }
    return <Component {...props} />; // if we reurn with angular tags then only it will be a component otherwise the definition of the component
  };
};

export default withAuthentication;
