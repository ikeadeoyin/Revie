const express = require("express")
const apartmentController = require("../controllers/apartmentController")
const {authorize} = require("../middleware/auth")

const router = express.Router()

// add a new apartment - you need to be a landlord
router.post("/", authorize, apartmentController.addApartment)

// get an apartment by ID
router.get("/:id", authorize, apartmentController.getApartment)

module.exports = router