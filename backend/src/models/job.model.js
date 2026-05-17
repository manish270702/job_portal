const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },

    company:{
        type:String,
        required:true
    },

    recruiterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    applicants:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    jobtype:{
        type:String,
        enum:['full-time', 'contract', 'part-time'],
        required:true
    }
    ,
    salary:{
        required:true,
        type:String
    }

})

module.exports = mongoose.model("Job",jobSchema)