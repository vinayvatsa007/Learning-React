import React, { Component } from "react";
import Table from "../../components/Table";
// import { string } from 'prop-types';
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AssignmentService from "../../services/Assignment";
import AssignmentForm from "../../components/Form";
// import TextField from "@material-ui/core/TextField";
import TextField from "../../components/TextField";
import DatePicker from "../../components/DatePicker";
// wrapping with withAuthentication
import withAuthentication from "../../components/withAuthentication";

const assignmentService = new AssignmentService();

const TABLE_COLUMNS = [
  { name: "id" },
  { name: "subName" },
  { name: "assignmentGivenByTeacher" },
  { name: "section" },
  { name: "assignmentDetails" },
  { name: "dueDate" },
  { name: "action" },
];

const styles = (theme) => {
  console.log("logging theme value", theme);
  return {
    button: {
      background: theme.palette.primary.light,
      color: theme.palette.primary.main,
      float: "right",
    },
  };
};

class Assignments extends Component {
  objAssignment = {
    subName: "",
    assignmentGivenByTeacher: 0,
    section: 0,
    assignmentDetails: "",
    dueDate: new Date().toISOString().split("T")[0], //'2020-04-01',
    // id: 0,
  };

  state = {
    searchText: "",
    list: [],
    isLoading: true,
    filteredList: [],
    isFormOpen: false,
    myAssignment: this.objAssignment,
    editMode: false,
    editRecordId: 0,
  };
  // render is also a method of class, similarly all respective event handler methods part of class thus defined outside render func
  onClickCreateAssignment = () => {
    // console.log("Create Button clicked");
    this.setState({ isFormOpen: true, editMode: false });
  };

  getAssignmentRecordById = (id) => {
    const assignmentList = this.state.list;
    const { myAssignment } = this.state;
    // console.log(assignmentList);
    const assignmentRecordById = assignmentList.filter((record) => {
      if (record.id == id) {
        return record;
      }
    });
    // console.log("edited record", assignmentRecordById);
    this.setState({ myAssignment: assignmentRecordById[0] });
    // this.setState({ myAssignment: assignmentRecordById[0] }, () => {
    //   console.log("updated state on edit", this.state.myAssignment);
    // });
  };
  onEditClickHandler = (record) => {
    console.log(record);
    this.setState(
      { isFormOpen: true, editMode: true, editRecordId: record.id },
      () =>
        console.log("onEditClickHandler logging state details----", this.state)
    );
    this.getAssignmentRecordById(record.id);
  };
  onDeleteClickHandler = async (id) => {
    console.log("deleting record id =>", id);
    if (id) {
      const result = await assignmentService.deleteRecord(id);
      if (result.success) {
        console.log("Record deleted at id = ", result);
        this.getAssignmentList();
      } else {
        console.log("Delete operation failed details = ", result);
      }
    }
  };
  onCloseAssignmentForm = () => {
    console.log("Close Button clicked");
    //resetting to default values on cancel click
    this.setState({
      isFormOpen: false,
      editMode: false,
      editRecordId: 0,
      myAssignment: this.objAssignment,
    });
  };

  onSubmitAssignmentDetails = async (id = 0) => {
    const { myAssignment } = this.state;
    // console.log("SubmitAssignmentDetails clicked----", myAssignment);
    try {
      if (id) {
        console.log("update method called with id =", id);
        const result = await assignmentService.updateRecord(myAssignment, id);
        if (result.success) {
          console.log("Record updated at id = ", result.id);
        }
      } else {
        console.log("insert method called with id =", id);
        const result = await assignmentService.insertRecord(myAssignment);
        if (result.success) {
          console.log("Record inserted at id = ", result.id);
        }
      }
      // reset state to default for editMode and editRecordId
      this.setState({
        isFormOpen: false,
        editMode: false,
        editRecordId: 0,
        myAssignment: this.objAssignment,
      });
    } catch (error) {
      alert("save failed...");
    }
  };
  onChangeField = (name, value) => {
    let myAssignment = this.state.myAssignment;
    myAssignment[name] = value;
    this.setState({ myAssignment }, () => {
      console.log(
        "updated state from onChangeField=>",
        this.state.myAssignment
      );
    });
  };
  getAssignmentList = async () => {
    let searchText = { key: "subName", value: this.state.searchText };
    const { results } = await assignmentService.find({ searchText });
    this.setState({ list: results, isLoading: false, filteredList: results });
  };
  render() {
    const {
      searchText,
      isLoading,
      filteredList,
      isFormOpen,
      myAssignment,
    } = this.state;
    const {
      subName,
      assignmentGivenByTeacher,
      section,
      assignmentDetails,
      dueDate,
    } = myAssignment;
    const { classes } = this.props;
    // console.log("state details-------", this.state);
    return (
      <div style={{ padding: 15, width: "90%" }}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => this.setState({ searchText: e.target.value })}
        />
        <Button
          className={classes.button}
          onClick={this.onClickCreateAssignment}
        >
          Create Assignment
        </Button>
        <Table
          columns={TABLE_COLUMNS}
          data={filteredList}
          isLoading={isLoading}
          onEditClickHandler={this.onEditClickHandler}
          onDeleteClickHandler={this.onDeleteClickHandler}
          confirmationDialogContent={"Are you confirm to delete?"}
          confirmationDialogTitle={"Delete assignment confirmation"}
        />
        <AssignmentForm
          open={isFormOpen}
          onClose={this.onCloseAssignmentForm}
          onSave={this.onSubmitAssignmentDetails}
          id={this.state.editRecordId}
          title="Add Assignment"
          formContent="This is my first form"
        >
          <TextField
            autoFocus
            margin="dense"
            label="Sub Name"
            type="text"
            fullWidth
            value={subName}
            name="subName"
            onChange={this.onChangeField}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Given By Teacher"
            type="text"
            fullWidth
            value={assignmentGivenByTeacher}
            name="assignmentGivenByTeacher"
            onChange={this.onChangeField}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Section"
            type="text"
            fullWidth
            value={section}
            name="section"
            onChange={this.onChangeField}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Details"
            type="text"
            fullWidth
            value={assignmentDetails}
            name="assignmentDetails"
            onChange={this.onChangeField}
          />
          {/* <TextField
            autoFocus
            margin="dense"
            label="Due Date"
            type="text"
            fullWidth
            value={dueDate}
            name="dueDate"
            onChange={this.onChangeField}
          /> */}
          <DatePicker
            disableToolbar={false}
            variant="" // pass inline for inline datepicker
            id="date"
            label="Due Date"
            name="dueDate"
            format="yyyy-MM-dd"
            // type="date"
            value={dueDate}
            onChange={this.onChangeField}
            // className={classes.textField}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
        </AssignmentForm>
      </div>
    );
  }
  async componentDidMount() {
    try {
      let searchText = { key: "subName", value: "" };
      const { results } = await assignmentService.find({ searchText });
      this.setState({ list: results, isLoading: false, filteredList: results });
    } catch (error) {
      console.log(
        "Assignment.js_didMount_errorMessage------",
        error.response.body
      );
      throw error;
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchText !== this.state.searchText) {
      this.getAssignmentList();
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchText !== this.state.searchText) {
  //     this.setState({
  //       filteredList: this.state.list.filter((li) => {
  //         return li.subName.toLowerCase().startsWith(this.state.searchText.toLowerCase());
  //       })
  //     });
  //   }
  // };
}
export default withAuthentication(withStyles(styles)(Assignments));
