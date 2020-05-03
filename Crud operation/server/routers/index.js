// for combining all routers from different tables will be combined here in index.js and providing a single access point for routers
const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const assignment = require("./assignment");
const student = require("./student");

server.use(bodyParser.json({ extended: true }));
server.use(cors()); // server.use is used for accessing middleware functions.

//assignments will be considered as assignment/list
server.use("/assignments", assignment);
server.use("/students", student);

//it runs as last and will definitely will have error if anywhere error is raised.
server.use((error, req, resp, next) => {
  resp.status(500);
  resp.send(error);
});

module.exports = server;
