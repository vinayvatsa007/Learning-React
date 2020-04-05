// will contain all db related functions, which can be shared among all files
const mysql = require('mysql2');

mysql.createConnection({host:'localhost', user:'root', password:'pulsar180', database:'assignment_db' });
mysql.connect((error)=>{
    if(error){
        console.log(error);
    } else{
        console.log('db connected');
    }
});

module.exports = mysql;
