// will contain all db related functions, which can be shared among all files
const mysql = require('mysql2');
const config = { host: '192.168.1.4', user: 'root', password: 'pulsar180', database: 'assignment_db' }
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
    // although we passing 2nd param but its useless because query already framed through template string, but result will come if we pass the callback function as 3rd param
    return dbCon.promise().query(query, tableName, (err, recordset) => err ? err : recordset);
};

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
const insertRecord = ( paramArray) => {
    const query = `INSERT INTO  assignment(id,subName, assignmentGivenByTeacher, section, assignmentDetails, dueDate)
    values(?,?,?,?,?,?)`;
    return dbCon.promise().query(query, paramArray, (err, recordset) => {
        return err ? err : recordset
    });
};

// via individual params
// const insertRecord = ( id,subName, assignmentGivenByTeacher, section, assignmentDetails, dueDate) => {
//     const query = `INSERT INTO  assignment(id,subName, assignmentGivenByTeacher, section, assignmentDetails, dueDate)
//     values(?,?,?,?,?,?)`;
//     return dbCon.promise().query(query, [id,subName, assignmentGivenByTeacher, section, assignmentDetails, dueDate], (err, recordset) => {
//         return err ? err : recordset
//     });
// };

module.exports = { find, findById, getListById, insertRecord }

