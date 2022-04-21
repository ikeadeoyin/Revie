const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Enter a valid email"]
    },
    password:{
        type: String,
        required: [true, "Enter a password with min. of 6 chars"]
    },
},
{timestamps: true}
)

//password hashing

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });




const User = mongoose.model("User", userSchema)

module.exports = User