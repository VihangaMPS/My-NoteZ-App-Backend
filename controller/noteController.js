const Note = require('../models/noteModel');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require('./handlerFactory');



exports.createNote = factory.createOne(Note);