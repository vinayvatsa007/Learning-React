import React from "react";
import Edit from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";

const Actions = (props) => {
  const { record, onEdit, deleteRecordId, onDelete } = props;
  const onEditHandler = () => {
    // console.log(record);
    onEdit(record);
  };
  const onDeleteHandler = () => {
    // console.log(deleteRecordId);
    onDelete(deleteRecordId);
  };

  return (
    <div>
      <Edit onClick={onEditHandler} />
      <Delete onClick={onDeleteHandler} />
    </div>
  );
};

export default Actions;
