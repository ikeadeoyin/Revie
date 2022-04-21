const express = require("express")
const userController = require("../controllers/userController")
const {authorize} = require("../middleware/auth")

const router = express.Router()

router.get("/info",authorize,  (req, res)=>{
    res.send("UserRouter working")
})


router.post("/signup", userController.signup)
router.post("/login", userController.login )


module.exports = router