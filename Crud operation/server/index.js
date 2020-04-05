const express = require('express');
const server = express();
const cors = require('cors');

// const sql = require('./db');
const { assignmentList } = require('./mockData');

server.use(cors()); // server.use is used for accessing middleware functions.

server.get("/url", (req, resp) => {
    //console.log(req);
    //console.log(['']);
    const myArray = [{ id: 1, name: "vinay" }, { id: 2, name: "vinay2" }, { id: 3, name: "vinay3" }];
    resp.send(myArray[0]);
    //resp.send('api worked');
});
server.get("/assignment/list", (req, resp) => {
    resp.send({ status: true, totalCount: assignmentList.length, results: assignmentList });
    //resp.send('api worked');
});
server.listen(3010, () => {
    console.log('server started');
})
console.log('hello');
// console.log('sql-', sql);