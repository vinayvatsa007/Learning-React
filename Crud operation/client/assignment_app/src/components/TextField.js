import React from "react";
import TxtField from "@material-ui/core/TextField";

const TextField = (props) => {
  const {
    autoFocus,
    margin,
    label,
    type,
    fullWidth,
    value,
    name,
    onChange,
  } = props;

  function handleChange(e) {
    onChange(name, e.target.value);
  }
  return (
    <TxtField
      autoFocus={autoFocus}
      margin={margin}
      label={label}
      type={type}
      fullWidth={fullWidth}
      value={value}
      onChange={handleChange}
    />
  );
};

export default TextField;