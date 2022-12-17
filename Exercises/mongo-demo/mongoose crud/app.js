'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {bookModel, status} = require('./book_model');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

// Establish the connection
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening to ${port}`)});

// Connect to the database
status();
mongoose.connect('mongodb://localhost:27017/library')
    .then(() => console.log("Successfully connected to the database..."))
    .catch(error => console.log("Error occured...", error));

app.get('/', (req, res) => {
    res.send("This is the root folder")
})

// Get all the contents in the books collection
app.get('/books', (req, res) => {
    bookModel.find()
        .exec((err, result) => {
            if (err) return res.send('Error occured: ', err);
            res.json(result);
        })
})

// Get a book with a specific _id
app.get('/books/:id', (req, res) => {
    bookModel.findOne({
        _id: req.params.id
    })
    .exec((err, result) => {
        if (err) return res.send("Error Occured...", err);
        res.json(result);
    })
})

// Adding a book
app.post('/books', (req, res) => {
    const inputData = new bookModel();
    inputData.name = req.body.title;
    inputData.author = req.body.author;

    inputData.save((err, result) => {
        if (err) return console.log("Error occured...", err);
        res.json(result);
    })
})

// Updating a book
app.put('/books/:id', (req, res) => {
    bookModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { title: req.body.title } },
        { upsert: true },
        (err, result) => {
            if (err) return console.log("error occured...", err);
            res.json(result);
        } 
    )
})

// Deleting data
app.delete('/books/:id', (req, res) => {
    bookModel.findOneAndDelete(
        { _id: req.params.id },
        (err, result) => {
            if (err) return console.log("Error occured...", err);
            res.json(result);
        }
    )
})

// For the purpose of inserting sample data
async function insertData(){
    const inputData = new bookModel({
    name: "cats cars and computers",
    tags: [ 'uh', 'oh' ],
    isPublished: true,
    author: "author-3",
    details:{
        modelNumber: 1,
        hardCopy: true,
        rank: 1
    }
    });
    const result = await inputData.save();
    console.log(result);
}
// insertData();

