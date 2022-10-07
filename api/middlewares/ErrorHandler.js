//const {JsonWebTokenError} = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError.js');
const InvalidParamError = require('../errors/InvalidParamError.js');
const TokenError = require('../errors/TokenError.js');
const QueryError = require('../errors/QueryError.js');
const statusCodes = require('../constants/statusCodes.js');
const PermissionError = require('../errors/PermissionError.js');

function ErrorHandler(error, req, res, next){
    let message = error.message;
    let status = statusCodes.INTERNAL_SERVER_ERROR;

    if(error instanceof PermissionError){
        status = statusCodes.UNAUTHORIZED;
    }
    if (error instanceof NotAuthorizedError){
        status = statusCodes.FORBIDDEN;
    }
    if (error instanceof InvalidParamError){
        status = statusCodes.BAD_REQUEST;
    }
    if (error instanceof TokenError){
        status = statusCodes.NOT_FOUND;
    }
    if (error instanceof QueryError){
        status = statusCodes.BAD_REQUEST;
    }

    console.log(error);
    res.status(status).json(message);
}

module.exports = ErrorHandler;