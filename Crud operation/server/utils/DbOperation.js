// will contain all db related functions, which can be shared among all files
const mysql = require('mysql2');
const config ={host:'192.168.1.101', user:'root', password:'pulsar180', database:'assignment_db' }
const dbCon = mysql.createConnection(config);
dbCon.connect( (error)=>{
    if(error){
        console.log(error);
    } else{
        console.log('db connected');
    }
})
// console.log(dbCon);
// const find = ()=>{
// return
// };
// const findById = ()=>{
// return
// };

dbCon.query("select * from assignment",(err, recordset)=>{
    if(err){
        console.log('query error - ', err);
    } else {
        console.log('query success - ', recordset);
    }
});

module.exports = mysql;
