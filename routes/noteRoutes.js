const noteController = require('../controller/noteController');
const userController = require('../controller/userController');
const express = require("express");

const noteRouter = express.Router();

noteRouter.route('/').post(userController.protect,noteController.createNote);



module.exports = noteRouter;