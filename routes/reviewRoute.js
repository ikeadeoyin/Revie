const express = require("express")
const reviewController = require("../controllers/reviewController")
const {authorize, restrictTo} = require("../middleware/auth")

const router = express.Router()

// add a review to an apartment
router.post("/apartments/:id/reviews", authorize ,reviewController.addReview)

// get all reviews for an apartment

router.get("/apartments/:id/reviews", reviewController.getApartmentReviews)

// get a single review by ID

router.get("/reviews/:id", reviewController.getReview)

// update a review with authorize

// delete a review with authorize


// update helpful_count
router.put("/reviews/:id", reviewController.updateCount)

// sort by count
router.get("/apartments/:id/reviews/count", reviewController.sortByCount)


module.exports = router