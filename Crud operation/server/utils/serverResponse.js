// will accept table data as input and transform it to object that can be sent back to client app
class ListResponse {
    constructor(data=[]) {
        this.success = true;
        this.results = data;
        this.totalCount = data.length;
        // this.testProperty = 'vinay';
    }
}
class ErrorResponse extends Error{
    
    constructor(e) {
        super();
        this.success = false;
        this.message = e.message;
    }
}
// for findById
class ObjectResponse {
    constructor(data={}) {
        this.success = true;
        this.results = data;
    }
}
class DeleteResponse {
    constructor(message='Record deleted successfully!') {
        this.success = true;
        this.message = message;
    }
}
class SaveAndUpdateResponse {
    //
    constructor({id, data={}}) {
        this.success = true;
        this.results = data;
        this.id = id;
    }
}
module.exports = { ListResponse, ErrorResponse, ObjectResponse, DeleteResponse, SaveAndUpdateResponse };