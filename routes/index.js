const express = require("express")
// import the other routes
const userRoutes = require("./userRoute")
const apartmentRoutes = require("./apartmentRoute")
const reviewRoutes = require("./reviewRoute")

const router = express.Router()

router.use("/", reviewRoutes)
router.use("/auth", userRoutes)
router.use("/apartment", apartmentRoutes)

module.exports = router