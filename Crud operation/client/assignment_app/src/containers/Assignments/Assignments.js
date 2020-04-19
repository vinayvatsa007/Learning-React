import React, { Component } from "react";
import Table from "../../components/Table";
// import { string } from 'prop-types';
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AssignmentService from "../../services/Assignment";
import AssignmentForm from "../../components/Form";
import TextField from "@material-ui/core/TextField";

const assignmentService = new AssignmentService();

const TABLE_COLUMNS = [
  { name: "subName" },
  { name: "assignmentGivenByTeacher" },
  { name: "section" },
  { name: "assignmentDetails" },
  { name: "dueDate" },
];

// const styles = (theme) => ({
//     button: {
//     background: "primary",
//     color: "secondary",
//   },
// });
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
    dueDate: new Date().toISOString().split("T")[0], //'2020-04-01'
  };

  state = {
    searchText: "",
    list: [],
    isLoading: true,
    filteredList: [],
    isFormOpen: false,
    myAssignment: this.objAssignment,
  };
  // render is also a method of class, similarly all respective event handler methods part of class thus defined outside render func
  onClickCreateAssignment = () => {
    console.log("Create Button clicked");
    this.setState({ isFormOpen: true });
  };
  onCloseAssignmentForm = () => {
    console.log("Close Button clicked");
    this.setState({ isFormOpen: false });
  };
  onSubmitAssignmentDetails = () => {
    console.log("SubmitAssignmentDetails clicked");
    this.setState({ isFormOpen: false });
  };
  onChangeField = (e) => {
    console.log(e.target.value, "event");
    console.log(e.target.name, "event");
    let myAssignment = this.state.myAssignment;
    const { name, value } = e.target;
    myAssignment[name] = value;
    // if (name == "dueDate" && !value) {
    //   myAssignment[name] = new Date().toISOString().split("T")[0];
    // } else {
    //   myAssignment[name] = value;
    // }

    this.setState({ myAssignment }, () => {
      console.log("updated state", this.state.myAssignment);
    });
    // let varName = `myAssignment.${e.target.name}:'${e.target.value}'`;
    // console.log(varName);
    // this.setState(() => {
    //   return { myAssignment: { varName } };
    // });
    // console.log(
    //   "from updated state===========",
    //   this.state.myAssignment.subName
    // );
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
    console.log("state details-------", this.state);
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
        />
        <AssignmentForm
          open={isFormOpen}
          onClose={this.onCloseAssignmentForm}
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
            onBlur={this.onChangeField}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Given By Teacher"
            type="text"
            fullWidth
            value={assignmentGivenByTeacher}
            name="assignmentGivenByTeacher"
            onBlur={this.onChangeField}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Section"
            type="text"
            fullWidth
            value={section}
            name="section"
            onBlur={this.onChangeField}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Details"
            type="text"
            fullWidth
            value={assignmentDetails}
            name="assignmentDetails"
            onBlur={this.onChangeField}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Due Date"
            type="text"
            fullWidth
            value={dueDate}
            name="dueDate"
            onBlur={this.onChangeField}
          />
        </AssignmentForm>
      </div>
    );
  }
  async componentDidMount() {
    // // under js engine VS8 its a default method available no separate import required. similar to console
    // // for ajax calling
    // fetch('http://localhost:3010/assignments/').then(res => res.json()).then(({ results }) => {
    //   // console.log(results);
    //   // this.setState({list:data.results})
    //   console.log('data from api', results);
    //   setTimeout(() => {
    //     this.setState({ list: results, isLoading: false, filteredList:results });
    //   }, 3000);

    // });
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
      let searchText = { key: "subName", value: this.state.searchText };
      const { results } = await assignmentService.find({ searchText });
      this.setState({ list: results, isLoading: false, filteredList: results });
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
export default withStyles(styles)(Assignments);
