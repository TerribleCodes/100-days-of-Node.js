const { response } = require('express');
const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

var movie = [
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
app.post('/vidly/movies/', (req, res) => {
    const movie_json = {
        name: req.body.name,
        genere: req.body.genere
    }
    movie.push(movie_json);
    res.send(movie);
})

// GET Operatoin
app.get('/vidly/movies/:name', (req, res) => {
    // Check whether the movie name is available
    const movie_valid = movie.find(c => c.name === req.params.name);
    if(!movie_valid) return res.status(404).send('Record is not Available');
    res.send(movie_valid);
});

// PUT Operatoin
app.put('/vidly/movies/', (req, res) => {
    // Check whether the movie name is available
    const movie_valid = movie.find(c => c.name === req.body.name);
    if (!movie_valid) return res.status(404).send('Record is not available');

    let index_of_movie = movie.indexOf(movie_valid);
    
    const {error} =  req_validation(req.body)

    // Usage of result.error --> {error}
    if (error) return res.status(400).send(error);

    movie[index_of_movie].name = req.body.name;
    movie[index_of_movie].genere = req.body.genere;
    res.send(movie);
});

// DELETE Operation
app.delete('/vidly/movies/', (req, res) => {
    // Validate the record is available
    const movie_valid = movie.find(c => c.name === req.body.name);
    if (!movie_valid) return res.status(404).send('Record is not available');
    
    // Get the index of the record
    let index_of_movie = movie.indexOf(movie_valid);

    // Input validation
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).send(error);

    movie.splice(index_of_movie, 1);
    res.send(movie);
})

// Reuse input validation function

function req_validation(body){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        genere: Joi.string().min(3).required()
    })
    return schema.validate(body)
}

// Connection
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));