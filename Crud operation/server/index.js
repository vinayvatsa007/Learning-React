// //====================== Connect to mySQL ==========================
const expressServer = require('./routers'); // it will fetch the index.js file bydefault
const { insertRecord } = require('./utils/DbOperation');

expressServer.listen(3010, () => {
    console.log('server started');
})

        // const listAssignment = find('assignment').then(data=>{ // bcoz find is a promise thus result should be called as .then otherwise it will return promise not the data.
        //     console.log('listAssignment -',data[0]);
        // });

        // const assignmentDetails = findById('assignment', 3).then(data=>{
        //     console.log(data[0]);
        // });

const objAssignment = {
    id: 14,
    subName: 'Geo',
    assignmentGivenByTeacher: 1,
    section: 1,
    assignmentDetails: 'test',
    dueDate: '2020-04-01'
};

        // let arrAssignment = [0];
let arrAssignment = Object.values(objAssignment);
        // console.log('type of arrAssignment ----------',Array.isArray(arrAssignment));
        // console.log('arrAssignment values ----------',arrAssignment);
const insertAssignmentDetails = insertRecord(arrAssignment).then(data => {
    console.log(data[0]);
});

        // //static values
        // const insertAssignmentDetails = insertRecord(8, 'Geo', 1, 1, 'test', '2020-04-01').then(data => {
        //     console.log(data[0]);
        // });
