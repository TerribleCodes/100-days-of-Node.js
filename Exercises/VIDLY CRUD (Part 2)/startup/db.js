const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function(){
    mongoose.connect('mongodb://localhost/vidly-database')
        .then(() => winston.info('Connected to MongoDB vidly-database...'))
}