// //====================== Connect to mySQL ==========================
const expressServer = require('./routers'); // it will fetch the index.js file bydefault
const { find, findById} = require('./utils/DbOperation');

expressServer.listen(3010, () => {
    console.log('server started');
})

const listAssignment = find('assignment').then(data=>data);
const AssignmentById = findById('assignment',4).then(data=>data);

console.log('index.js-listAssignment ', listAssignment);
console.log('index.js-AssignmentById ',AssignmentById);
