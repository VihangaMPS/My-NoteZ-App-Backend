const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a Title"]
    },
    content: {
        type: String,
        required: [true, "Please add a Content"]
    },
    tags: {
        type: [String],
        default: []
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: [true, "Please provide a User ID !"]
    },
    createdOn : {
        type: Date,
        default: new Date().getTime()
    }
});

module.exports = mongoose.model("Note", noteSchema);