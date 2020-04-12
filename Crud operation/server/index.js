// //====================== Connect to mySQL ==========================
const expressServer = require('./routers'); // it will fetch the index.js file bydefault
const { find, findById, insertRecord, deleteRecord, updateRecord } = require('./utils/DbOperation');

expressServer.listen(3010, () => {
    console.log('server started');
})

// const listAssignment = find('assignment').then(data=>{ // bcoz find is a promise thus result should be called as .then otherwise it will return promise not the data.
//     console.log('listAssignment -',data[0]);
// });

const assignmentDetails = findById('assignment', 20).then(data=>{
    console.log(data[0]);
});

const objAssignment = {
    subName: 'update via qmark',
    assignmentGivenByTeacher: 4,
    section: 2,
    assignmentDetails: 'test1',
    dueDate: new Date().toISOString().split('T')[0] //'2020-04-01'
};

// const insertAssignmentDetails = insertRecord('assignment',objAssignment).then(data => {
//     const insertedId = data[0]['insertId']
//     console.log(insertedId);
//     // findById('assignment', insertedId).then(data => {
//     //     console.log('----------------Assignment.findById------------\n',data[0]);
//     // });
// });


//------final one working fine
// const updateAssignmentDetails = updateRecord('assignment',13,objAssignment).then(data => {
//     const affectedRows = data[0]['affectedRows'];
//     console.log(affectedRows);
//     // findById('assignment', insertedId).then(data => {
//     //     console.log('----------------Assignment.findById------------\n',data[0]);
//     // });
// });

// const updateAssignmentDetails = updateRecord(objAssignment).then(data => {
//     const affectedRows = data[0]['affectedRows'];
//     console.log(affectedRows);
//     // findById('assignment', insertedId).then(data => {
//     //     console.log('----------------Assignment.findById------------\n',data[0]);
//     // });
// });


// let arrAssignment = [0];
// let arrAssignment = Object.values(objAssignment);
// console.log('type of arrAssignment ----------',Array.isArray(arrAssignment));
// console.log('arrAssignment values ----------',arrAssignment);
// const insertAssignmentDetails = insertRecord(arrAssignment).then(data => {
//     const insertedId = data[0]['insertId']
//     console.log(insertedId);
//     findById('assignment', insertedId).then(data => {
//         console.log('----------------Assignment.findById------------\n',data[0]);
//     });
// });

        // //static values
        // const insertAssignmentDetails = insertRecord(8, 'Geo', 1, 1, 'test', '2020-04-01').then(data => {
        //     console.log(data[0]);
        // });

// const deleteassignment = deleteRecord( 'assignment', 41).then(data=>{
//     console.log(data[0]['affectedRows']);
// });

// const deleteassignment = deleteRecord(14).then(data=>{
//     console.log(data[0]);
// });