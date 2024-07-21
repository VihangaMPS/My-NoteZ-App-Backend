const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const globalErrorHandler = require('./controller/errorController');

const userRouter = require('./routes/userRoutes');
const User = require("./models/userModel")

const jwt = require("jsonwebtoken");
const {authenticateToken} = require('./util')

const app = express();

app.use(express.json( {limit: "15kb"}));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({ origin: "*" }));

// app.get("/", (req, res) => {
//     res.json({
//         data: "hello"
//     })
// })

app.use('/api/users',userRouter);

/*app.post("/createAccount", async (req, res) => {
    const {fullName, email, password} = req.body;

    if (!fullName) {
        return res.status(400).json({
            status: "Full Name is required !"
        })
    }
    if (!email) {
        return res.status(400).json({
            status: "Email is required !"
        })
    }
    if (!password) {
        return res.status(400).json({
            status: "Password is required !"
        })
    }

    //Check the current user exists
    const isUser = await User.findOne({email: email});

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists !"
        })
    }

    // If user not exists, create a new user
    const user = new User({
        fullName,
        email,
        password
    });

    // Save new user
    await user.save();

    const accessToken = jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    return res.json({
        error: false,
        user: user,
        token: accessToken,
        message: "Registration Successful !"
    })
})*/

// ========== Global Error Handling Middleware ==============
app.use(globalErrorHandler);

module.exports = app;