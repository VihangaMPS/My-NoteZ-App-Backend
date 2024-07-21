const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
});


//////  ================ Middleware  ================ /////////

// Encrypting password when new User Signup --------------------
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // encrypting password ---------
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

// Instance Method Comparing bcrypt password to user login password -----------------
userSchema.methods.correctPassword = async function (candidatePassword, userEncryptPassword) {
    return await bcrypt.compare(candidatePassword, userEncryptPassword); // return true  or false
};

//////  ================================================ /////////

const User = mongoose.model("User", userSchema);

module.exports = User;