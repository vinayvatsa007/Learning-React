import React, { useState, Fragment } from "react";
// import {useState} from React;
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Actions from "./Actions";
import ConfirmationDialog from "./Dialog";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
    padding: 15,
  },
});

function SimpleTable(props) {
  const {
    classes,
    columns,
    isLoading,
    data,
    onEditClickHandler,
    onDeleteClickHandler,
    confirmationDialogContent,
    confirmationDialogTitle,
  } = props;
  // use state returns 2 things 1. the value 2nd the setter func which will take true/false in our case.
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(
    false
  );
  const [currentRecord, setCurrentRecord] = useState(null);
  let [finalConfirmationMessage, setFinalConfirmationMessage] = useState([]);
  const onCancelConfirmationDialog = () => {
    console.log("onCancelConfirmationDialog is called");
    //on cancel reset everything
    setIsConfirmationDialogOpen(false);
    setCurrentRecord(null);
  };

  const onOkConfirmationDialog = () => {
    console.log("onOkConfirmationDialog is called...");
    setIsConfirmationDialogOpen(false);
    onDeleteClickHandler(currentRecord);
  };
  // let finalConfirmationMessage = "vinay";
  const handleDelete = (id) => {
    setFinalConfirmationMessage(
      // use fragment to wrap muti items
      // <Fragment>
      //   {confirmationDialogContent}
      //   <br />
      //   {id}
      // </Fragment>
      //2 ways of doing this. either send values as array and while showing final content on diaolog component then render via map or use fragment to wrap muti items
      [confirmationDialogContent, <br />, id]
    );
    setIsConfirmationDialogOpen(true);
    setCurrentRecord(id);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return (
                <TableCell key={col.name}>{col.name.toUpperCase()}</TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <CircularProgress />
          ) : (
            data.map((row) => {
              return (
                <TableRow key={row.id}>
                  {columns.map(({ name, render }) => {
                    return (
                      <TableCell key={name + row.id}>
                        {render
                          ? render(row)
                          : row[name] === "dob"
                          ? new Date(row[name]).toISOString().split("T")[0]
                          : row[name]}
                      </TableCell>
                    );
                  })}

                  <TableCell>
                    <Actions
                      record={row}
                      onEdit={onEditClickHandler}
                      onDelete={handleDelete}
                      deleteRecordId={row.id}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <ConfirmationDialog
        open={isConfirmationDialogOpen}
        // open={true}
        handleCancel={onCancelConfirmationDialog}
        handleOk={onOkConfirmationDialog}
        content={finalConfirmationMessage}
        title={confirmationDialogTitle}
      />
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
