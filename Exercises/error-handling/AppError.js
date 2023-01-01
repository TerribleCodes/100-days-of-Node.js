class AppError extends Error{
    constructor(errorCode, message, statusCode){
        super(message);
        this.errorCode = errorCode;
        this.statuCode = statusCode;
    }
}
module.exports = AppError