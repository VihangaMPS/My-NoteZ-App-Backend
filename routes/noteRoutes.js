const noteController = require('../controller/noteController');
const express = require("express");

const noteRouter = express.Router();

noteRouter.route('/').post(noteController.createNote);