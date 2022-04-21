const express = require("express")
const app = express()

// import the routes
const apiRoutes = require("./routes/index")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes)

app.get("/", (req, res)=>{
    res.send("Hello world")
})

module.exports = app