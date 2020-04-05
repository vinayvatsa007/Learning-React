// for combining all routers from different tables will be combined here in index.js and providing a single access point for routers
const express = require('express');
const server = express();
const cors = require('cors');

const assignment = require('./assignment');

server.use(cors()); // server.use is used for accessing middleware functions.
//assignments will be considered as assignment/list
server.use('/assignments', assignment);

module.exports = server;