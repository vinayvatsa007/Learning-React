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
      const resp = await request.get(this.getUrl()).query(filters);
      console.log("find method results ---", resp);
      return resp.body;
    } catch (error) {
      console.log("Error_from_BaseService.js", error);
      throw error;
      // new Error({message:error.message, status:error.status})
    }
  };
  insertRecord = async (requestBody) => {
    try {
      const resp = await request.post(this.getUrl("add")).send(requestBody);
      console.log("find method results ---", resp);
      return resp.body;
    } catch (error) {
      console.log("Error_from_BaseService.js", error);
      throw error;
      // new Error({message:error.message, status:error.status})
    }
  };
  updateRecord = async (requestBody, id) => {
    try {
      const resp = await request
        .put(this.getUrl(`update/${id}`))
        .send(requestBody);
      console.log("updateRecord=>find method results ---", resp);
      return resp.body;
    } catch (error) {
      console.log("updateRecord=>Error_from_BaseService.js", error);
      throw error;
      // new Error({message:error.message, status:error.status})
    }
  };
}

export default BaseService;
