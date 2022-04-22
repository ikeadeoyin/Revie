const mongoose = require("mongoose")
const {isEmail, isURL} = require("validator")
const Review = require("./review")

const apartmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[ true, "Please enter the apartment's name"]
    },
    price: {
        type: Number,
        required: [true, "Enter the apartment's price"]
    },
    address:{
        type: String, 
        required: [true, "Enter the Adresss"]
    },
    units: {
        type: Number,
        required: [true, 'Please add units available']
    },
    bedroom: {
        type: Number,
        required: [true, 'Please add number of bedroom']
    },
    kitchen: {
        type: Number,
        required: [true, 'Please add number of kitchen']
    },
    bathroom: {
        type: Number,
        required: [true, 'Please add number of bathroom']
    },
    landlord: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    amenities: {
        // Array of Strings
        type: [ String ],
        required: true,
        enum: [
          "Lux Appliances",
          "wifi",
          "Swimming Pool",
          "Parking Place",
          "Gym and Fitness",
          "Outdoor Space",
          "Fireplace",
          "Elevator",
          "Basketball court",
          "Lawn Tennis court"
        ]
    },
    media:{
          // optional media of videos and/or photos
          type: [String]
    },
    phone_number:{
        type: String
    },
    website:{
        type: String,
        validate: [isURL, "Enter a valid URL"]
    },
     
},
{
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})


// const authorSchema = new Schema({ name: String }, {
//     toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
//     toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
//   });

// do reverse populate with virtual
apartmentSchema.virtual("reviews", {
    ref: Review,
    localField: "_id",
    foreignField: "user",
    justOne:false
})

const Apartment = mongoose.model("Apartment", apartmentSchema)

module.exports = Apartment