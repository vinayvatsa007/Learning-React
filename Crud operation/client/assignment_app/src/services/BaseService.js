//use library superagent via npm install superagent
// for better communication of backend services
import request from "superagent";

class BaseService {
  // constBaseUrl = '/assignments'
  constructor(route) {
    this.baseRoute = route;
    this.baseUrl = "http://localhost:3010/";
  }

  getUrl = () => {
    const fullUrl = this.baseRoute.includes("/")
      ? this.baseUrl + this.baseRoute
      : this.baseUrl + this.baseRoute + "/";
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
}

export default BaseService;
