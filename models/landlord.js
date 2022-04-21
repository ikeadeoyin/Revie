const mongoose = require("mongoose")

const landlordSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[ true, "Please enter the full name"]
    },
    phone_number:{
        type:Int,
        maxlength: [11, "Phone number cannot be more than 11 characters"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Enter a valid email"]
    }
})