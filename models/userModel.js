const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: 5
    },
    createdOn: {
        type: Date,
        default: new Date().getTime()
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;