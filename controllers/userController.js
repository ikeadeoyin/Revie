const brcypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User} = require("../models/index")

const {createToken, maxAge} = require("../middleware/auth")
const  {errorHandler} = require("../utils/errorHandler")



const signup = async (req, res, next) => {
    const {username, email, password, role} = req.body

    // check if user already exists

    const emailExists = await User.findOne({email})
    if(emailExists){
     return res.status(409).send("User Already Exists! Please login")
    }

    try {
        const user = await User.create({username, email, password, role})
        const token = createToken(user._id)
        res.cookie("jwt", token, {httpOnly:true, maxAge:maxAge * 1000});

        return res.status(200).json({user:user, token})
    } catch (err) {
        const errors = errorHandler(err);
        res.status(400).json({errors}); 
        
    }

    
}

const login = async (req, res, next)  =>{
    try {
       // get user's input
       const {email, password} = req.body
       
    const user = await User.findOne({ email });
    const match = await user.isPasswordMatch(password)
    if (!user && !match){
        res.send("Error")
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, {httpOnly:true, maxAge:maxAge * 1000})
    res.status(200).json({user, token})
    } catch (err) {
        errorHandler(err)
        
    }
}

module.exports = {signup, login}