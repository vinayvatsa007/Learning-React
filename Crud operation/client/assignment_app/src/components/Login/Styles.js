import { makeStyles, useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles(() => {
  return {
    loginWrapper: {
      background: "white",
      minWidth: 200,
      width: "300px",
      margin: "30% auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
    },
    title: {
      color: "#333",
      margin: "5px 0",
    },
    loginMainWrapper: {},
    textField: {
      display: "block",
      marginBottom: 10,
    },
    loginButton: {
      display: "block",
      backgroundColor: "#7583d0",
      width: "40%",
      margin: "10px 0",
    },
    errorChip: {
      color: "red",
      borderRadius: 0,
      width: "100%",
      border: "none",
    },
  };
});
export default useStyles;
