const {User, Apartment, Review} = require("../models/index")

const  {errorHandler} = require("../utils/errorHandler")

// add a new review for an apartment

const addReview = async(req, res, next) =>{
    const {user, title, body, star_rating, amenities_rating, landlord_rating, environment_rating} = req.body

    // check if apartment and user exists
    // user
    const userExists = await User.findById(user)
    if(!userExists) {
        return res.status(300).send(`User with id ${user} does not exist`)
    }

    // apartment
    const  apartment = req.params.id
    const apartmentExists = await Apartment.findById(apartment)
    if(!apartmentExists){
        return res.status(300).send(`Apartment with id ${apartment} does not exist`)
    }

    try {
        const review = await Review.create({
            user,
            apartment,
            title,
            body,
            star_rating,
            amenities_rating,
            environment_rating,
            landlord_rating,

        })
        res.status(200).json({
            success:true,
            review
        })
    } catch (err) {
        console.log(err)
        const errors = errorHandler(err);
        res.status(400).json({errors});
        
    }
}

// Get all reviews

// Get all reviews for an apartment
const getApartmentReviews = async(req, res, next) => {

     sortsBy = req.query.sortBy

    // check if apartment and user exists

    // apartment
    const apartmentID = req.params.id
    const apartmentExists = await Apartment.findById(apartmentID)
    if(!apartmentExists){
        return res.status(300).send(`Apartment with id ${apartmentID} does not exist`)
    }

    try {
        
        const apartmentReviews = await Review.find({apartment:apartmentID}).sort({sortsBy: "desc"})
        // .populate("apartment")
        // .where({apartment: apartmentID})
       
    
        res.status(200).json({
            success:true,
            data:apartmentReviews
        })
        
    } catch (err) {
        // console.log(err)
        // const errors = errorHandler(err);
        console.log(err)
        res.status(400).json({message:err}); 
        
    }

}

// Get a review by ID
const getReview = async (req, res, next) =>{
    const reviewID = req.params.id

    const review = await Review.findById(reviewID)

    try {
       if(!review) {
        return res.status(300).send(`Apartment with id ${apartmentID} does not exist`)
       } 

       res.status(200).json({
           success: true,
          review
       })
    } catch (err) {
        console.log(err)
        const errors = errorHandler(err);
        res.status(400).json({errors});       
    }
}

// update a review with helpful count
const updateCount = async(req, res, next) =>{

    const {helpful} = req.body

    const reviewID = req.params.id

    const review = await Review.findById(reviewID)
    
    try {
        if(!review) {
         return res.status(300).send(`Apartment with id ${apartmentID} does not exist`)
        } 
     

        if(helpful == true){
            const updateReview = await Review.findByIdAndUpdate({_id:reviewID}, {$inc:{"helpful_count": 1}}, {new: true})
            return res.status(200).json({
                status: true,
                message: "operation successful",
                updateReview,
              });      
        }else{
            return res.status(200).json({
                success: true,
                review,
            })
    }
}
       
     catch (err) {
         console.log(err)
         const errors = errorHandler(err);
         res.status(400).json({errors});       
     }

}
// Sort reviews for an apartment by helpful count
const sortByCount = async(req, res, next) =>{
    
    
    // check if apartment and user exists

    // apartment
    const apartmentID = req.params.id
    const apartmentExists = await Apartment.findById(apartmentID)
    if(!apartmentExists){
        return res.status(300).send(`Apartment with id ${apartmentID} does not exist`)
    }

    try {
        const apartmentReviews = await Review.find({apartment:apartmentID}).sort({helpful_count: "desc"})
        // .populate("apartment")
        // .where({apartment: apartmentID})
       
    
        res.status(200).json({
            success:true,
            data:apartmentReviews
        })
        
    } catch (err) {
        // console.log(err)
        // const errors = errorHandler(err);
        console.log(err)
        res.status(400).json({message:err}); 
        
    }




}



// update a review

// delete review

module.exports = {addReview, getApartmentReviews, getReview, updateCount,sortByCount}