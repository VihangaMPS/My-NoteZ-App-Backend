const noteController = require('../controller/noteController');
const userController = require('../controller/userController');
const express = require("express");

const noteRouter = express.Router();

noteRouter.route('/').get(noteController.getAll).post(userController.protect,noteController.createNote);
noteRouter.route('/:id')
    .patch(userController.protect,noteController.updateNote).delete(userController.protect,noteController.deleteNote);


module.exports = noteRouter;