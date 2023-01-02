const mongoose = require('mongoose');

const userModel = mongoose.model('user_login', new mongoose.Schema({
    username: String,
    password: String,
}));

module.exports = userModel;