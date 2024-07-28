const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    termsConidtion: {
        type: String,
        required: true
    }
});

const users = new mongoose.model('users', User);

module.exports = users;