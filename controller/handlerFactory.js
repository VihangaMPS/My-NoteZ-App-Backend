const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAll = Model => catchAsync(async (req, res, next) =>  {

    const doc = await Model.find();

    res.status(200)
        .json({
            status: 'success',
            results: doc.length,
            data: {
                document: doc
            }
        });
});

exports.getOne = (Model, populateOptions) => catchAsync(async (req, res, next) => {
    console.log(req.query);

    const doc = await Model.findById(req.user.id);
    // this.query = this.query.sort('-createdAt');

    if (!doc) {
        return next(new AppError('No Document found with that ID', 404));
    }

    res.status(200)
        .json({
            status: 'success',
            data: {
                document: {
                    "_id": doc._id,
                    fullName: doc.fullName,
                    email: doc.email,
                    createdOn: doc.createdOn,
                }
            }
        });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.create({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        isPinned: req.body.isPinned,
        user: req.user.id
    });

    res.status(201).json({
        status: 'success',
        data: {
            document: doc
        }
    });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        // (updateId, body object, options object )
        new: true, // return the new modified document rather than the old document.Default is false
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No Document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            document: doc
        }
    });
});

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    console.log("req.query : " , req.query);

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No Document found with that ID', 404));
    }

    res.status(204).json({ // 204 - No Content
        status: 'success',
        data: null
    });
});

