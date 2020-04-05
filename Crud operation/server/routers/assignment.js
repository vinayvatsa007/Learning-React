// table wise routers management i.e. for assignment - add/update/delete routes will be in this file
// we will define all the routes here thus instead of entire express we just need the express.Router
const router = require('express').Router();

router.get('/', ()=>{
    console.log('hello1')
});

module.exports = router;