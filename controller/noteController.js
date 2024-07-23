const Note = require('../models/noteModel');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require('./handlerFactory');

exports.getAll = factory.getAll(Note)

exports.createNote = factory.createOne(Note);

exports.updateNote = factory.updateOne(Note);

exports.deleteNote = factory.deleteOne(Note);