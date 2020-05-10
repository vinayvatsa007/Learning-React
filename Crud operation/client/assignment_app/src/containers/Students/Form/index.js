// StudentForm = Student->Form->index.js
import React, { useState, useEffect } from "react";
import Form from "../../../components/Form";
import TextField from "../../../components/TextField";
import DatePicker from "../../../components/DatePicker";
import StudentService from "../../../services/Student";
const studentService = new StudentService();
const StudentForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editRecord, setEditRecord] = useState({}); // must pass default vales otherwise code will break during destructuring the vales from editRecord
  const { isFormOpen, onClose, id } = props;
  // const { isFormOpen, id } = props;

  const {
    name,
    dob,
    gender,
    currentClassId,
    admissionNumber,
    organizationId,
    branchId,
    transportMode,
  } = editRecord;

  const objStudent = {
    name: "",
    dob: new Date().toISOString().split("T")[0], // default current date in specific format
    gender: "",
    currentClassId: "",
    admissionNumber: "GDG-15-2351",
    organizationId: "",
    branchId: "",
    transportMode: "school",
  };
  // console.log("form.index.js->outside return->state var->", editRecord);

  // const onEdit = async () => {
  //   const recordResults = await getStudentRecordById(id);
  //   console.log("onEdit.recordResults22222", recordResults);
  //   setEditRecord(recordResults);
  // };

  useEffect(() => {
    const updateStudent = async () => {
      setIsLoading(true);
      const { results } = await studentService.findById(id); // console.log( "form.Index->useEffect->studentService.findById.response-->",results);
      if (results) {
        results["dob"] = new Date(results["dob"]).toISOString().split("T")[0];
        setEditRecord(results);
      }
      setIsLoading(false);
    };
    updateStudent();
    // console.log("index form useEffect called", id);

    // return () => {
    //   console.log("component will unmount");
    //   // return results;
    // };
  }, []);

  // useEffect(() => {
  //   return () => {
  //     console.log("Component Will Unmount");
  //   };
  // });
  const onChangeField = (name, value) => {
    // set the state vars in case of edit otherwise in student object
    // console.log('form.index->onChangeField->id--',id)
    if (id) {
      // console.log('edit');
      setEditRecord({ ...editRecord, [name]: value });
    } else {
      objStudent[name] = value;
      // console.log('add... objstud',objStudent);
    }
  };

  const getStudentRecordById = async (id) => {
    setIsLoading(true);
    const { results } = await studentService.findById(id);
    // setEditRecord(results);
    // console.log(
    //   "getStudentRecordById editRecord after setEditRecord",
    //   editRecord
    // );
    setIsLoading(false);
    return results;
  };
  const onSave = async () => {
    try {
      if (id) {
        console.log("update id=", id);
        const results = await studentService.updateRecord(editRecord, id);
        if (results.success) {
          console.log("Record updated at id = ", results.id);
        }
      } else {
        // console.log("insert id=", id);
        // console.log("insert - objStudent --", objStudent);
        const results = await studentService.insertRecord(objStudent);
        if (results.success) {
          console.log("Record inserted at id = ", results.id);
        }
      }
      onClose(true);
    } catch (error) {
      console.log("error occurred in student->form->index.js", error);
    }
  };

  return (
    <Form
      onClose={onClose}
      onSave={onSave}
      open={isFormOpen}
      title={"Student Master"}
      formContent={"for managing student details"}
    >
      <TextField
        autoFocus
        margin="dense"
        label="Name"
        type="datepicker"
        fullWidth
        name="name"
        value={name}
        onChange={onChangeField}
      />
      <DatePicker
        disableToolbar={false}
        variant="" // pass inline for inline datepicker
        id="dob"
        label="Date of Birth"
        name="dob"
        value={dob}
        format="yyyy-MM-dd"
        onChange={onChangeField}
      />
      <TextField
        autoFocus={true}
        margin="dense"
        label="Gender"
        type="text"
        fullWidth
        name="gender"
        value={gender}
        onChange={onChangeField}
      />
      <TextField
        autoFocus={true}
        margin="dense"
        label="Current Class"
        type="text"
        fullWidth
        name="currentClassId"
        value={currentClassId}
        onChange={onChangeField}
      />
      <TextField
        autoFocus={true}
        margin="dense"
        label="Admission Number"
        type="text"
        fullWidth
        name="admissionNumber"
        value={admissionNumber}
        onChange={onChangeField}
      />
      <TextField
        autoFocus={true}
        margin="dense"
        label="Organization"
        type="text"
        fullWidth
        name="organizationId"
        value={organizationId}
        onChange={onChangeField}
      />
      <TextField
        autoFocus={true}
        margin="dense"
        label="Branch"
        type="text"
        fullWidth
        name="branchId"
        value={branchId}
        onChange={onChangeField}
      />
      <TextField
        autoFocus={true}
        margin="dense"
        label="Transport Mode"
        type="text"
        fullWidth
        name="transportMode"
        value={transportMode}
        onChange={onChangeField}
      />
    </Form>
  );
};

export default StudentForm;
