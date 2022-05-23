const errorResponse = require('../utils/errorResponse')


// handle errors
const errorHandler = (err, req, res, next) =>{
    // console.log(err.message, err.code);
    let error = {...err};

    error.message = err.message

    console.log(err)

    // incorrect emails
    if(err.message === "incorrect email"){
        const message = "that email is not registered"
        error = new errorResponse(message, 400)
    }

    // incorrect password
    if(err.message === "incorrect password"){
        const message = "That password is incorrect";
        const error = new err({
            message: error ? error.message : 'Unauthorized',
            status: httpStatus.UNAUTHORIZED,
            stack: error ? error.stack : undefined,
          });
        error = new errorResponse(message, 400)
    }

    // unique email
    if (err.code === 11000) {
        const message = "That email is already registered";
        error = new errorResponse(message, 400)   
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors.errors).forEach(error => {
        console.log(error.properties.path)
        // errors[error.path] = error.message
        });
    }

     // Mongoose validation error
    if (err.name === 'ValidationError') {
         const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
     }

    return error;

}

module.exports = errorHandler