'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema initialization

const bookSchema = new Schema({
    name: String,
    published: { type: Date, default: Date.now() },
    tags: [ String ],
    isPublished: Boolean,
    author: String,
    details:{
        modelNumber: Number,
        hardCopy: Boolean,
        rank: Number
    }
})

const bookModel = mongoose.model('books', bookSchema); // Model the schema before exporting

function status () {
    console.log("Schema has been modeled successfully...");
}

module.exports = {bookModel, status};