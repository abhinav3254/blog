const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true
    },
    published: {
        type: Boolean,
        default: true
    },
    publishedDate: {
        type: Date,
        default:Date.now()
    },
    like: {
        type:Number,
        default:0
    },
    readTime: {
        type:Number
    },
    isLiked:{
        type:Boolean,
        default: false
    },
    isBookmarked:{
        type:Boolean,
        default: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }]
}, { timestamps: true });
BlogSchema.index({
    title: 'text',
    content: 'text',
    description: 'text',
    tags: 'text',
    category: 'text'
});
const Blog = mongoose.model('blogs', BlogSchema);

module.exports = Blog;
