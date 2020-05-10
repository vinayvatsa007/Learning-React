// will contain all db related functions, which can be shared among all files
const mysql = require("mysql2");
const config = {
  host: "192.168.1.3",
  user: "root",
  password: "pulsar180",
  database: "schoolmanagement_db",
};
const {
  getKeysAndValuesFromReqBody,
  getUpdateSrtingFromReqBody,
} = require("./index");
const Responses = require("./serverResponse");

const dbCon = mysql.createConnection(config);

dbCon.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("db connected");
  }
});

//call back method
// const find = (tableName) => {
//     const query = `select * from ${tableName}`;
//     // although we passing 2nd param but its useless because query already framed through template string, // but result will come if we pass the callback function as 3rd param
//     return dbCon.promise().query(query, tableName, (err, recordset) => err ? err : recordset);
// };

// const find = (tableName) => {
//     const query = `select * from ${tableName}`;
//     // although we passing 2nd param but its useless because query already framed through template string, but result will come if we pass the callback function as 3rd param
//     return dbCon.promise().query(query, tableName, (err, recordset) => {
//         // console.log('recordset------', recordset);
//         // console.log('ListResponse(recordset)------', new ListResponse(recordset));
//         // console.log('ListResponse(recordset[0])------', new ListResponse(recordset[0]));
//         return  err ? err:'hello swarn';
//         // return err ? new ErrorResponse(err) : new ListResponse(recordset[0]);
//     });
// };

const find = async (tableName, filters) => {
  try {
    const { searchText: { key, value } = {} } = filters;

    let query = `select * from ${tableName}`;
    if (key && value) {
      query += ` where ${key} like '%${value}%' `;
    }

    // console.log(query);
    // although we passing 2nd param but its useless because query already framed through template string, but result will come if we pass the callback function as 3rd param
    const [data, fields] = await dbCon.promise().query(query, tableName);
    // return 'hello'
    return new Responses.ListResponse(data);
  } catch (error) {
    throw new Responses.ErrorResponse(error);
    // console.log('find->catch error thrown',error);
    // throw error;
  }
};

//async /await
const findById = async (tableName, id) => {
  try {
    const query = `select * from ${tableName} where id=?`;
    const [data, fields] = await dbCon.promise().query(query, id);
    // sending only 0th value becuase i need to send this as single object otherwise it will be treated as array
    return new Responses.ObjectResponse(data[0]);
  } catch (error) {
    return new Responses.ErrorResponse(error);
  }
};

// // old way of writing using callback function
// const findById = (tableName, id) => {
//     const query = `select * from ${tableName} where id=?`
//     return dbCon.promise().query(query, id, (err, recordset) => err ? err : recordset);
// };

// const findById = async (tableName, id) =>  {
//     try {
//          // first element will be data 2nd will be meta data(fields)
//         const [data, fields] = await dbCon.promise().query(`select * from ${tableName} where id =${id}`, [tableName, id]);
//         // console.log('findById-----------', data);
//         return data;
//     } catch (error) {
//         console.log('findByIdError-',error);
//     }
// };
const getListById = (tableName, id) => {
  return dbCon
    .promise()
    .query(
      `select * from ${tableName} where id =${id}`,
      [tableName, id],
      (err, data, fields) => {
        return err ? err : data;
      }
    );
};
//using async await
const insertRecord = async (tableName, objRecord) => {
  try {
    const { keys, values } = getKeysAndValuesFromReqBody(objRecord);
    const query = `INSERT INTO  ${tableName}(${keys})
        values(?)`;
    const [data, fields] = await dbCon.promise().query(query, [values]);
    const { insertId: id } = data;
    return new Responses.SaveAndUpdateResponse({ id, data });
  } catch (error) {
    new Responses.ErrorResponse(error);
  }
};
// using callback
// const insertRecord = (tableName, objRecord) => {
//     const { keys, values } = getKeysAndValuesFromReqBody(objRecord);
//     const query = `INSERT INTO  ${tableName}(${keys})
//     values(?)`;
//     return dbCon.promise().query(query, [values], (err, recordset) => {
//         if (err) {
//             console.log(err);
//         }
//         return err ? err : recordset
//     });
// };

//async await
const updateRecord = async (tableName, id, objRecord) => {
  try {
    const { keys, values } = getKeysAndValuesFromReqBody(objRecord);
    const updateString = getUpdateSrtingFromReqBody(objRecord); // console.log('update string returned by - getUpdateSrtingFromReqBody util method', updateString);
    const query = `UPDATE ${tableName} SET ${updateString} WHERE id =?`;
    const [data, fields] = await dbCon.promise().query(query, id);
    return new Responses.SaveAndUpdateResponse({ id, data });
  } catch (error) {
    new Responses.ErrorResponse(error);
  }
};
//call back method
// const updateRecord = (tableName, id, objRecord) => {
//     // console.log('|||||||||||||||||||||| objRecord ||||||||||||||||||||||',objRecord);
//     const { keys, values } = getKeysAndValuesFromReqBody(objRecord);
//     const updateString = getUpdateSrtingFromReqBody(objRecord);     // console.log('update string returned by - getUpdateSrtingFromReqBody util method', updateString);
//     const query = `UPDATE ${tableName} SET ${updateString} WHERE id =?`;
//     // console.log('update query ---------', query);
//     return dbCon.promise().query(query, [id], (err, recordset) => {
//         return err ? err : recordset
//     });
// };

//async await
const deleteRecord = async (tableName, id) => {
  try {
    const query = `DELETE FROM ${tableName} WHERE id = ?`;
    const [data, fields] = await dbCon.promise().query(query, id);
    // console.log(data);
    return data["affectedRows"]
      ? new Responses.DeleteResponse("Record deleted successfully!")
      : new Responses.ErrorResponse({ message: "No record found to delete!!" });
    // if (data['affectedRows'] > 0) {
    //     return new Responses.DeleteResponse('Record deleted successfully!');
    // } else {
    //     both statemenet will work but because success is not used in error response but its hardcoded.
    //     return new Responses.ErrorResponse({ success: false, message: 'No record found to delete!!' });
    //     return new Responses.ErrorResponse({ message: 'No record found to delete!!' });
    // }
  } catch (error) {
    return new Responses.ErrorResponse(error);
  }
};
//call back method
// const deleteRecord = (tableName, id) => {
//     const query = `DELETE FROM ${tableName} WHERE id = ?`;
//     return dbCon.promise().query(query, id, (err, recordset) => {
//         return err ? err : recordset
//     });
// };

module.exports = {
  find,
  findById,
  getListById,
  insertRecord,
  deleteRecord,
  updateRecord,
};
