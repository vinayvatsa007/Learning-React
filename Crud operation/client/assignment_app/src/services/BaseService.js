//use library superagent via npm install superagent
// for better communication of backend services
import request from "superagent";

class BaseService {
  // constBaseUrl = '/assignments'
  constructor(route) {
    this.baseRoute = route;
    this.baseUrl = "http://localhost:3010/";
  }

  getUrl = (actionURL = "") => {
    let fullUrl = this.baseRoute.includes("/")
      ? this.baseUrl + this.baseRoute
      : this.baseUrl + this.baseRoute + "/";
    fullUrl += actionURL;
    return fullUrl;
  };
  // 5 crud and 1 raw - anonymous req
  //const filters
  find = async (filters) => {
    try {
      //Node Services hosting URL ---- http://localhost:3010/
      // route=> assignments/
      const resp = await request.get(this.getUrl()).query(filters);
      // console.log("find method results ---", resp);
      return resp.body;
    } catch (error) {
      console.log("Error_from_BaseService.js", error);
      throw error;
      // new Error({message:error.message, status:error.status})
    }
  };

  //Node Services hosting URL ---- http://localhost:3010/students/1
  // route=> students/1
  findById = async (id) => {
    try {
      const serviceURL = this.getUrl(`${id}`);
      // console.log(serviceURL);
      const resp = await request.get(serviceURL).query();
      // console.log("findById method results ---", resp);
      return resp.body;
    } catch (error) {
      console.log("Error_from_BaseService.js", error);
      throw error;
    }
  };
  //Node Services hosting URL ---- http://localhost:3010/
  // route=> add/
  insertRecord = async (requestBody) => {
    try {
      const resp = await request.post(this.getUrl("add")).send(requestBody);
      console.log("Insert method results ---", resp);
      return resp.body;
    } catch (error) {
      console.log("Error_from_BaseService.js", error);
      throw error;
      // new Error({message:error.message, status:error.status})
    }
  };
  //Node Services hosting URL ---- http://localhost:3010/
  // route=> update/:id -----http://localhost:3010/assignments/update/46
  updateRecord = async (requestBody, id) => {
    try {
      delete requestBody.id;
      const resp = await request
        .put(this.getUrl(`update/${id}`))
        .send(requestBody);
      console.log(
        "updateRecord=> response from service update method ---",
        resp
      );
      console.log(
        "updateRecord=> resp.body from service update method ---",
        resp.body
      );
      return resp.body;
    } catch (error) {
      console.log("updateRecord=>Error_from_BaseService.js", error);
      throw error;
    }
  };
  //Node Services hosting URL ---- http://localhost:3010/
  // route=> delete/:id--- http://localhost:3010/assignments/delete/50
  deleteRecord = async (id) => {
    try {
      const resp = await request
        .delete(this.getUrl(`delete/${id}`))
        // .send(requestBody);
        //.send({ id: id });  //----- it will also work.
        .send(id); // we don't have req body here but just the id thus we just need to request.send(id)
      console.log("deleteRecord=> method results ---", resp);
      return resp.body;
    } catch (error) {
      console.log("deleteRecord=>Error_from_BaseService.js", error);
      throw error;
    }
  };
}

export default BaseService;
