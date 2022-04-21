const express = require("express")
const userController = require("../controllers/userController")

const router = express.Router()

router.get("/info", (req, res)=>{
    res.send("UserRouter working")
})


router.post("/signup", userController.signup)

module.exports = router