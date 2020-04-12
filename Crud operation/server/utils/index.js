const getKeysAndValuesFromReqBody = (reqBody) => {
    let keys = [], values = [];

    for (let key in reqBody) {
        keys.push(key);
        values.push(reqBody[key])
    }
    //method2 but need iteration 2 times
    // const keys = Object.keys[reqBody];
    // const values = Object.values[reqBody];

    //method3 but need iteration 2 times
    // const objectArray = Object.entries(reqBody);
    // objectArray.forEach(([key, value]) => {
    //     // console.log(key); // 'one'
    //     // console.log(value); // 1
    //     keys.push(key);
    //     values.push(values);
    // })

    // keys need to be passed as comma separated string thus converting array to string
    keys = keys.join();
    return { keys, values };
};

const getUpdateSrtingFromReqBody = (reqBody) => {
    let updateString = '';
    // for (let key in reqBody) {
    //     updateString += `${key} = '${reqBody[key]}',`;
    // }
    for (let key in reqBody) {
        if(typeof reqBody[key]=='string'){
            updateString += `${key} = '${reqBody[key]}',`;
        }
        else{
            updateString += `${key} = ${reqBody[key]},`;
        }
        
    }
    // console.log(updateString);
    updateString = updateString.substr(0, updateString.length - 1);
    console.log('updateString- dynamic stmt-----', updateString);
    return updateString;
};


// const getUpdateSrtingFromReqBody = (reqBody) => {
//     let keys = [], values = [];

//     console.log(reqBody);
//     const objectArray = Object.entries(reqBody);
//     objectArray.forEach(([key, value]) => {
//         keys.push(key);
//         values.push(value);
//     })
//     console.log(keys, values);

//     let updateString ='';
//      for(let i=0; i< keys.length; i++){
//         updateString = updateString.concat(keys[i], ' = ', "'" ,values[i], "'" );
//         i == (keys.length -1) ? updateString.concat(' ') : updateString = updateString.concat(', ');
//     }
//     return updateString;
// };

module.exports = { getKeysAndValuesFromReqBody, getUpdateSrtingFromReqBody };