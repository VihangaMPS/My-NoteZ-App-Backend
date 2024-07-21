const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync")


// Creating JWT Token  ----------------
const signToken = id => {
    return jwt.sign({ id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

// Sending the created token, when Signup,Login,ResetPassword,UpdatePassword
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // Remove the password from response
    //user.password = undefined;

    res.status(statusCode).json({ // 201 - created
        status: 'success',
        token: token,
        data: {
            user: user
        }
    })
}

exports.signup = catchAsync(async (req, res) => {
    console.log(req.body);

    const newUser = await User.create(req.body);

    createSendToken(newUser, 201, res)
});

