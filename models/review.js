const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    apartment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment',
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: [true, 'Please add a title for the review']
    },
    body:{
        type: String,
        required: [true, 'Please add some text']
    },
    star_rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 5']
    },
    amenities_rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 5']
    },
    landlord_rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 5']
    },
    environment_rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 5']
    },
    helpful_count: {
        type: Number,
        default: 0
    },


},
{timestamps: true,
    // toJSON: {
    //     virtuals: true
    // },
    // toObject: {
    //     virtuals: true
    // }
})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review