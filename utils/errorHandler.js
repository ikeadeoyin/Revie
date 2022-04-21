
// handle errors
const errorHandler = (err) =>{
    console.log(err.message, err.code);
    let errors = {email: " ",password: " "};

    // incorrect emails
    if(err.message === "incorrect email"){
        errors.email = "that email is not registered";
    }

    // incorrect password
    if(err.message === "incorrect password"){
        errors.password = "That password is incorrect";
    }

    // unique email
    if (err.code === 11000) {
        errors.email = "That email is already registered";
        return errors;    
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors.errors).forEach(error => {
        console.log(error.properties.path)
        // errors[error.path] = error.message
        });
    }

    return errors;

}

module.exports = {errorHandler}