require('dotenv').config({path:"./config/.env",debug: true})
const mongoose = require("mongoose")
const DB_URI = process.env.DB_ATLAS_URI



// console.log(DB_URI)

// mongoose.connect(DB_URI, {
//     //must add in order to not get any error masseges:
//     useUnifiedTopology:true,
//     useNewUrlParser: true,
// })
// .then(()=> {console.log("Running")})
// .catch((err) => console.log(err))


const dbConnect = async ()=> {

    await mongoose.connect(DB_URI, {
        useUnifiedTopology:true,
        useNewUrlParser: true,
    })
    .then(()=> {console.log("Running")})
    .catch((err) => console.log(err))
,
    mongoose.connection
    .on('open', () => console.log(('MongoDB: Connection Succeeded')))
    .on('error', err => console.error(err))
}


  

// const dbConnect = (()=> {
//     mongoose.connection
//     .on('open', () => console.log(('MongoDB: Connection Succeeded')))
//     .on('error', err => console.error(err))
// })
// dbConnect()

module.exports = dbConnect