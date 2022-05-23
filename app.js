const express = require("express")
const app = express()
const errorHandler = require("./utils/errorHandler")

// import the routes
const apiRoutes = require("./routes/index")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes)

app.use(errorHandler);

// app.get("/", (req, res)=>{
//     res.send(`Revie is running on port ${port}`)
// })

module.exports = app