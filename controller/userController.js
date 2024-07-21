const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError");


// Creating JWT Token  ----------------
const signToken = id => {
    return jwt.sign({ id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

// Sending the created token, when Signup,Login,ResetPassword,UpdatePassword
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // Hide the password from response
    user.password = undefined;

    res.status(statusCode).json({ // 201 - created
        status: 'success',
        token: token,
        data: {
            user: user
        }
    })
}

exports.signup = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body);

    createSendToken(newUser, 201, res)
});

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    // 1)Checking email password exists
    if (!email || !password) {
        next(new AppError('Please provide email and password', 400)); // 400 - Bad request
    }

    // 2)Check if user exists & password is correct
    const user = await User.findOne({email: email}).select('+password'); // + -> add this hidden field for the output

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401)); // 401 - Unauthorized
    }

    // 3)If everything ok, send token to client
    createSendToken(user, 200, res);
});
