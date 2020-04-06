// will contain all db related functions, which can be shared among all files
const mysql = require('mysql2');
const config = { host: '192.168.1.101', user: 'root', password: 'pulsar180', database: 'assignment_db' }
const dbCon = mysql.createConnection(config);
dbCon.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('db connected');
    }
})
//it takes an array of input params
const find = async (tableName) =>  { 
    // first element will be data 2nd will be meta data(fields)
    const [data, fields] = await dbCon.promise().query(`select * from ${tableName}`, [tableName]); 
    console.log('data-----------', data); // console.log('fields-----------', fields);
    return data;
};

const findById = async (tableName, id) =>  { 
    // first element will be data 2nd will be meta data(fields)
    const [data, fields] = await dbCon.promise().query(`select * from ${tableName} where id =${id}`, [tableName, id]); 
    console.log('findById-----------', data);
    return data;
};

//old way of writing
// const  findById = (tableName, id) => {
//    return dbCon.query("select * from ? where id =assignme", [tableName,id], (err, recordset) => {
//         return err? err:recordset;
//     }); 
// };

module.exports = {find, findById }

