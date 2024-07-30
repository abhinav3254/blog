const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookmarkSchema = new Schema({
	blog:[{
		type: Schema.Types.ObjectId,
        ref: 'blogs',
        required: true
	}],
	user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
},{ timestamps: true });

const Bookmark = mongoose.model('bookmarks', BookmarkSchema);

module.exports = Bookmark;