// //====================== Connect to mySQL ==========================
const expressServer = require('./routers'); // it will fetch the index.js file bydefault
const mysqlCon = require('./utils/DbOperation');

expressServer.listen(3010, () => {
    console.log('server started');
})

// //=======================================================================
// //====================== Connect to sql server ==========================
// var sql = require("mssql");

//     // config for your database
//     var config = {
//         user: 'sa',
//         password: 'pulsar180',
//         server: '192.168.1.101', 
//         database: 'assignment_db' 
//     };

//     // connect to your database
//     sql.connect(config, function (err) {
    
//         if (err){
//             console.log('-------------connection fialed------------',err);
//         } else {
//             console.log('db connection done!!!!!');
//         }

//         // create Request object
//         var request = new sql.Request();
           
//         // query to the database and get the records
//         request.query('select * from assignmentDetails ', function (err, recordset) {
            
//             if (err) console.log(err)

//             // send records as a response
//             // res.send(recordset);
//             console.log(recordset);
            
//         });
//     });