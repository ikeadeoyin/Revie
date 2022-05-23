const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const {isEmail} = require("validator")


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[ true, "Please enter a username"]
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
    role:{
        type: String,
        enum: ["user", "landlord"],
        default: "user"

    }
},
{timestamps: true}
)

//password hashing

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

// userSchema.static.emailExists = function(email){
//     const user = User.findOne({email})
//     if(user) {

//     }
// }



userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
  };



const User = mongoose.model("User", userSchema)

module.exports = User