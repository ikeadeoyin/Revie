const express = require("express")
const apartmentController = require("../controllers/apartmentController")
const {authorize} = require("../middleware/auth")

const router = express.Router()

// add a new apartment - you need to be a landlord
router.post("/", authorize, apartmentController.addApartment)

// get all apartments
router.get("/", apartmentController.getAllApartments)

// get an apartment by ID
router.get("/:id", authorize, apartmentController.getApartment)

// get all reviews for an apartment
router.get("/:id/reviews", apartmentController.getAllReviews)

// update apartment
router.put("/:id", authorize, apartmentController.updateApartment)

// delete apartment



module.exports = router