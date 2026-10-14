const AppError = require("./appError");

class BadRequestError extends AppError {

    constructor(invalidParams){
        // invalid params:[]

        let message = "";
        invalidParams.forEach(param => message += `${param}\n, `);



        super(`The request has the following invalid parameters \n ${invalidParams} `, 400 );
    }
}

module.exports = BadRequestError;