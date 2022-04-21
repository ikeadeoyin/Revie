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
      // 1) check if the token is there
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token) {
        return res.status(403).send( "You are not logged in! Please login in to continue")
      }

      try {
          const decoded = jwt.verify(token. process.env.JWT_SECRET)

          user = await User.findById(decoded.id)
          req.user
          next()
      } catch (error) {
        res.status(401).json({
            status: false,
            message: "Sorry, you must provide a valid token."
        })
    }
}

module.exports = {createToken, maxAge, authorize }