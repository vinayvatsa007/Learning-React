// table wise routers management i.e. for student - add/update/delete routes will be in this file
// we will define all the routes here thus instead of entire express we just need the express.Router
const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  find,
  findById,
  insertRecord,
  updateRecord,
  deleteRecord,
} = require("../utils/DbOperation");

// if we write multiple routes then its mandatory to do resp.send otherwise it won't allow to go next API and will behave unexpectedly
router.get(
  "/",
  asyncHandler(async (req, resp) => {
    try {
      const data = await find("student", req.query);
      resp.send(data);
    } catch (error) {
      console.log("Student_Find_error_thrown", error);
      throw error;
    }
  })
);

router.get("/:id", (req, resp) => {
  // resp.send('get by id' + req.params.id);
  findById("student", req.params.id).then((data) => {
    resp.send(data);
  });
});

//using async await
router.post("/add", (req, resp) => {
  // console.log('add--->', req.body);
  insertRecord("student", req.body).then((data) => {
    resp.send(data);
  });
});

router.put("/update/:id", (req, resp) => {
  // console.log('update request', req.body);
  updateRecord("student", req.params.id, req.body).then((data) => {
    resp.send(data);
  });
});

router.delete("/delete/:id", (req, resp) => {
  // console.log('delete request', req.body);
  deleteRecord("student", req.params.id).then((data) => {
    resp.send(data);
  });
});

module.exports = router;
