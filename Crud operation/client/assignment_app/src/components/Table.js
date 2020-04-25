import React, { useState } from "react";
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
    marginTop: theme.spacing.unit * 3,
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
  const handleDelete = (id) => {
    setIsConfirmationDialogOpen(true);
    setCurrentRecord(id);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return <TableCell>{col.name.toUpperCase()}</TableCell>;
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
                  <TableCell numeric>{row.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.subName}
                  </TableCell>
                  <TableCell numeric>{row.assignmentGivenByTeacher}</TableCell>
                  <TableCell numeric>{row.section}</TableCell>
                  <TableCell>{row.AssignmentDetails}</TableCell>
                  <TableCell>{row.dueDate}</TableCell>
                  <TableCell>
                    {/* <input
                      type="button"
                      value="edit"
                      id={row.id}
                      onClick={(e) => {
                        onEditClickHandler(row);
                      }}
                    /> */}
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
        content={confirmationDialogContent}
        title={confirmationDialogTitle}
      />
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
