const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;
