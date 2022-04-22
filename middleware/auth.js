const jwt = require("jsonwebtoken")
const {User} = require("../models/index")

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

  

authorize = async (req, res, next) => {
    //   // 1) check if the token is there
    //   let token= req.headers["x-access-token"] || req.headers.authorization || req.body.token;;
    //   if (token || req.headers.authorization.startsWith("Bearer ")) {
    //     token = req.headers.authorization.split(" ")[1].trim();
    //   }
    //   if (!token) {
    //     return res.status(403).send( "You are not logged in! Please login in to continue")
    //   }
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1].trim();
    }
    if (!token) {
        return res.status(403).send("You are not logged in! Please login in to continue");
      }
    

      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET)

          req.user = await User.findById(decoded.id)
        
          next()
      } catch (error) {
        res.status(401).json({
            status: false,
            message: "Sorry, you must provide a valid token."
        })
    }
}

const restrictTo = async (role) =>{
    try {
        if(role !== "landlord"){
         return res.status(400).send("Basic User is not authorized to add apartments.")
         next()
    }
        
    } catch (error) {
        console.log(error)
        res.send(error)

        
    }
    

}

module.exports = {createToken, maxAge, authorize, restrictTo }