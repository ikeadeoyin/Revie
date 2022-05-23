const brcypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User} = require("../models/index")


const {createToken, maxAge} = require("../middleware/auth")
const  {errorHandler} = require("../utils/errorHandler")
const errorResponse = require("../utils/errorResponse")



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
        // return errorHandler(err)
        // return next(new errorResponse("Password is incorrect", 401))
        // console.log(err)
        const error = new errorResponse(err, 402)
        return next(error)
        // const errors = errorHandler(err);
        // res.status(400).json({error}); 
        
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