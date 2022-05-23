const jwt = require("jsonwebtoken")
const {User} = require("../models/index")
const {errorResponse} = require("../utils/errorResponse")

const emailExists = (email = '') => {
    User.findOne({email})
    if (emailExists) {
        throw new Error("Email already exists!")
    }
}
const maxAge = 3* 24 * 60 * 60;

const createToken = id => {
    return jwt.sign(
      {id,},
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
};

  

const authorize = async (req, res, next) => {
  
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1].trim();
    }
    if (!token) {
        return next(new errorResponse("You are not logged in! Please login in to continue", 403));
      }
    

      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET)

          req.user = await User.findById(decoded.id)
        
          next()
      } catch (error) {
          return next(new errorResponse('You are not authorized to access this route', 401));
    }
}

const restrictTo = async (req, res, next, ...roles) =>{
    try {
      if (!roles.includes(req.user.role)){
        return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403))  
    }
        
    } catch (error) {
      return next(new ErrorResponse(error, 500))
    }
    

}

module.exports = {createToken, maxAge, authorize, restrictTo }