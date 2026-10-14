const AppError = require("./appError");

class internalServerError extends AppError {

    constructor(properties, resource){
        // properties:[]
        super(`it's not you it's our server mething went wrong`, 500 );
    }
}

module.exports = internalServerError;