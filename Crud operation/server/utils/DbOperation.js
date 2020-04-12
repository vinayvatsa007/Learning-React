// will contain all db related functions, which can be shared among all files
const mysql = require('mysql2');
const config = { host: '192.168.1.4', user: 'root', password: 'pulsar180', database: 'assignment_db' }
const { getKeysAndValuesFromReqBody, getUpdateSrtingFromReqBody } = require('./index');
// const { ListResponse, ErrorResponse } = require('./serverResponse');

const dbCon = mysql.createConnection(config);

dbCon.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('db connected');
    }
})

//call back method
const find = (tableName) => {
    const query = `select * from ${tableName}`;
    // although we passing 2nd param but its useless because query already framed through template string, // but result will come if we pass the callback function as 3rd param
    return dbCon.promise().query(query, tableName, (err, recordset) => err ? err : recordset);
};

// const find = (tableName) => {
//     const query = `select * from ${tableName}`;
//     // although we passing 2nd param but its useless because query already framed through template string, but result will come if we pass the callback function as 3rd param
//     return dbCon.promise().query(query, tableName, (err, recordset) => {
//         // console.log('recordset------', recordset);
//         // console.log('ListResponse(recordset)------', new ListResponse(recordset));
//         // console.log('ListResponse(recordset[0])------', new ListResponse(recordset[0]));
//         return 'hello swarn';
//         // return err ? new ErrorResponse(err) : new ListResponse(recordset[0]);
//     });
// };

//old way of writing using callback function
const findById = (tableName, id) => {
    const query = `select * from ${tableName} where id=?`
    return dbCon.promise().query(query, id, (err, recordset) => err ? err : recordset);
};
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
    return dbCon.promise().query(`select * from ${tableName} where id =${id}`, [tableName, id], (err, data, fields) => {
        return err ? err : data;
    });
};

// via array params
const insertRecord = (tableName, objRecord) => {
    const { keys, values } = getKeysAndValuesFromReqBody(objRecord);
    const query = `INSERT INTO  ${tableName}(${keys})
    values(?)`;
    return dbCon.promise().query(query, [values], (err, recordset) => {
        if (err) {
            console.log(err);
        }
        return err ? err : recordset
    });
};

const updateRecord = (tableName, id, objRecord) => {
    // console.log('|||||||||||||||||||||| objRecord ||||||||||||||||||||||',objRecord);
    const { keys, values } = getKeysAndValuesFromReqBody(objRecord);
    const updateString = getUpdateSrtingFromReqBody(objRecord);     // console.log('update string returned by - getUpdateSrtingFromReqBody util method', updateString);
    const query = `UPDATE ${tableName} SET ${updateString} WHERE id =?`;
    // console.log('update query ---------', query);
    return dbCon.promise().query(query, [id], (err, recordset) => {
        return err ? err : recordset
    });
};


const deleteRecord = (tableName, id) => {
    const query = `DELETE FROM ${tableName} WHERE id = ?`;
    return dbCon.promise().query(query, id, (err, recordset) => {
        return err ? err : recordset
    });
};
module.exports = { find, findById, getListById, insertRecord, deleteRecord, updateRecord }

