require('dotenv').config()

const dbConnect = require("./config/database")
const app = require("./app")

const port = process.env.PORT || 3000



// database connection
dbConnect()



app.listen(port, () => {
    console.log(`Revie is running on port ${port}`)
})