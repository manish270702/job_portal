const mongoose = require('mongoose')

const connectToDb = ()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/jobportal")
        .then(console.log("connected to db"))
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDb