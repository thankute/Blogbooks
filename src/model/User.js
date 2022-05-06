const mongoose = require('mongoose');

const UserSchema =  new mongoose.Schema({
    name: { 
        type: String,
        require: true,
        min: 6
    },
    email: {
        type: String,
        require: true,
        min: 10,
        max: 255
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 255
    }
}, { timestamps: true})

module.exports = mongoose.model('User', UserSchema)
