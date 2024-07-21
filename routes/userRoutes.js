const express = require("express");
const userController = require('../controller/userController');

const userRouter = express.Router();


userRouter.route('/signup').post(userController.signup);

module.exports = userRouter;