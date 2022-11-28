const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const genere = [
    {"name":"The Hobbit", "genere":"Love it(1)"},
    {"name":"Sixty Shades", "genere":"uh...I can explain"},
    {"name":"LOTR", "genere":"Love it(2)"},
    {"name":"Spider Man", "genere":"aunt May"},
    {"name":"The Bois", "genere":"les goo"},
    {"name":"After", "genere":"meh..."},
    {"name":"Bleach", "genere":"yes"},
];

// Root folder implementation
app.get('/',(req,res) => {
    res.send("This is the root folder");
});

// CRUD Operations

// POST Operation


// GET Operatoin
app.get('/vidly/movies', (req, res) => {
    res.send(genere);
});

// PUT Operatoin


// DELETE Operation























// Connection
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`))