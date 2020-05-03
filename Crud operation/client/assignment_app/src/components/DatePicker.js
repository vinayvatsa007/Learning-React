import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
// import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// export default function MaterialUIPickers() {

function DatePickers(props) {
  // The first commit of Material-UI
  // const [selectedDate, setSelectedDate] = React.useState(
  //   new Date("2014-08-18T21:11:54")
  // );
  const {
    value,
    onChange,
    label,
    id,
    format,
    name,
    disableToolbar,
    variant,
  } = props;
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );

  const handleDateChange = (date) => {
    // setSelectedDate(date);
    onChange(name, new Date(date).toISOString().split("T")[0]);
  };
  return (
    // <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar={disableToolbar}
        variant={variant}
        format={format}
        margin="normal"
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
export default DatePickers;
