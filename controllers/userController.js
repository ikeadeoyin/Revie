const brcypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User} = require("../models/index")

const {createToken} = require("../middleware/auth")

const signup = async (req, res, next) => {
    const {username, email, password} = req.body

    // check if user already exists

    const emailExists = await User.findOne({email})
    if(emailExists){
        throw new Error("Email already exists!")
    }

    try {
        const user = await User.create({username, email, password})
        token = createToken(user.id)

        return res.status(200).json({user:user, token})
    } catch (err) {
        console.log(err)
    }

    
}

module.exports = {signup}