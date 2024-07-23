const express = require("express");
const userController = require('../controller/userController');

const userRouter = express.Router();


userRouter.route('/signup').post(userController.signup);
userRouter.route('/login').post(userController.login);

userRouter.use(userController.protect);

userRouter.route('/').get(userController.getUser)

module.exports = userRouter;