const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError");
const {promisify} = require("util");


// Creating JWT Token  ----------------
const signToken = id => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

// Sending the created token, when Signup,Login,ResetPassword,UpdatePassword
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // Hide the password filed from response
    user.password = undefined;

    res.status(statusCode).json({ // 201 - created
        status: 'success',
        token: token,
        data: {
            user: user
        }
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const {email} = req.body;
    const user = await User.findOne({email: email});

    // Check user already exists, when creating a new user
    if (user) {
        return next(new AppError('User already exists !', 400));
    }

    // Creating a new User
    const newUser = await User.create(req.body);

    createSendToken(newUser, 201, res)
});

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    // 1)Checking email password exists
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400)); // 400 - Bad request
    }

    // 2)Check if user exists & password is correct
    const user = await User.findOne({email: email}).select('+password'); // + -> add this hidden field for the output

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401)); // 401 - Unauthorized
    }

    // 3)If everything ok, send token to client
    createSendToken(user, 200, res);
});

exports.protect = catchAsync( async (req, res, next) => {
    // 1) Getting token( check if there is a registered token & that token is a Bearer token )
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]; // Splitting the token from authorization header(Bearer "token")
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please login to get access', 401));
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);
    // decoded -> { id: '...id...', iat: 1721626320, exp: 1724736720 }
    // iat -> created time | exp -> expired time

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return next(new AppError('The User belonging to the token does not exists!', 401))
    }

    // 4) If current log-in user Ok, Grant access to Protected Route
    req.user = currentUser;

    next();
});