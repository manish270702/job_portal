const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['student', 'recruiter', 'admin'],
        required: true
    },

    profile: {
        resumeURL: {
            type: String
        },

        skills: [
            {type: String}
        ],

        bio: {
            type: String
        }
    }

})

module.exports = mongoose.model("User", userSchema)