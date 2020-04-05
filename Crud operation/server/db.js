const sql= require('mssql');
const conConfig = {
    user: 'sa',
    password: 'pulsar180',
    server: 'localhost', 
    // port:65269,
    database: 'assignment_db' 
};
// 'mssql://sa:pulsar180@localhost:26164/assignment_db'
sql.connect('mssql://sa:pulsar180@localhost:65269/assignment_db', (err)=>{
    if(err){
        console.log('sql connect error ------',err);
    }else{
        console.log('connection done');
    }
});

module.exports= {sql} ;
