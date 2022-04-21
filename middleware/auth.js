const jwt = require("jsonwebtoken")
const {User} = require("../models/index")

const emailExists = (email = '') => {
    User.findOne({email})
    if (emailExists) {
        throw new Error("Email already exists!")
    }
}

const createToken = id => {
    return jwt.sign(
      {
        id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
  };


module.exports = {createToken}