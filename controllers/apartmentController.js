const {User, Apartment} = require("../models/index")

const  {errorHandler} = require("../utils/errorHandler")

// post a new apartment

const addApartment= async (req, res, next) => {

    const {name, price, address, units, bedroom, kitchen, bathroom, media, phone_number, amenities, website,landlord} = req.body
    try {

        // check if user exists
        const userExists = await User.findById(landlord)
        if (!userExists){
            return res.status(300).send(`User with id ${landlord} does not exit. Create an account.Incoorect User id`)
        }
        // ensure that user role is Landlord
        if (userExists.role !== "landlord"){
            console.log(userExists.role)
            return res.status(300).send("Basic User is not authorized to add apartments.")
        }

        const apartment = await Apartment.create({
            name,
            price,
            units,
            bedroom,
            kitchen,
            bathroom,
            media,
            address,
            website,
            amenities,
            phone_number,
            landlord
        })
        
        res.status(201).json({
            success: true,
            apartment
          });           
    } catch (err) {
        console.log(err)
        const errors = errorHandler(err);
        res.status(400).json({errors});
        
    }
}
// get one apartment by ID
const getApartment = async(req, res, next) => {
   const  apartmentID = req.params.id

   const apartment = await Apartment.findById(apartmentID)

    try {
       if(!apartment) {
        return res.status(300).send(`Apartment with id ${apartmentID} does not exist`)
       } 

       res.status(200).json({
           success: true,
           apartment
       })
    } catch (err) {
        console.log(err)
        const errors = errorHandler(err);
        res.status(400).json({errors});     
    }
}

// update an apartment
const updateApartment = async(req, res, next) => {
    const  apartmentID = req.params.id


      // check if apartment exists
      const apartmentExists = await Apartment.findById(apartmentID).populate("landlord")
      if (!apartmentExists){
          return res.status(300).send(`Apartment with id ${apartmentID} does not exist`)
      }

     // ensure that user role is Landlord
     if (apartmentExists.landlord.role !== "landlord"){
        console.log(apartmentExists.landlord.role)
        return res.status(300).send("Basic User is not authorized to update apartments.")
     }
    try { 
        apartment = await Apartment.findByIdAndUpdate(apartmentID, req.body, {new:true})
        res.status(200).json({
            success: true,
            apartment
        })
    }
    catch(err){
        console.log(err)
        const errors = errorHandler(err);
        res.status(400).json({errors});    
    }

} 
// Get all apartments
const getAllApartments = async(req, res, next) => {
    try {
        const apartments = await Apartment.find({})

        res.status(200).send({
            success: true,
            apartments
        })
 
    } catch (err) {
        console.log(err)
        const errors = errorHandler(err);
        res.status(400).json({errors}); 
        
    }

   

}


// Get apartment by ID

// Get all apartments by a unique user

// Get all reviews for an apartment


const getAllReviews = async(req, res, next) => {
    const apartmentID = req.params.id
    

    const apartmentExists = await Apartment.findById(apartmentID)
    if(!apartmentExists){
        console.log("no apartment found")
    }
    const apartmentReviews = await apartmentExists.populate("reviews")
    console.log(apartmentReviews.reviews)
   
     res.status(200).json({
         success:true,
         reviews:apartmentReviews.reviews

     })

}


// delete apartment

const deleteApartment = () => {}
module.exports = {addApartment, getApartment, updateApartment, getAllApartments, getAllReviews}