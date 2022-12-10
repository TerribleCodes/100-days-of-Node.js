const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();

const genereSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const genereModel = mongoose.model('generes', genereSchema);

router.get('/', async (req, res) => {
    const result = await genereModel.find().sort('name');
    res.send(result);
})

router.get('/:name', (req, res) => {
    genereModel.findOne({
        _id: req.body.name
    })
    .exec((err, result) => {
        if (err) return console.log('Error occured...', err)
        console.log(result)
        res.send(result)
    })
});


router.post('/', (req, res) => {
    const newModel = new genereModel();
    newModel.name = req.body.name;

    newModel.save((err, result) => {
        if (err) return console.log('Error occured...', err);
        res.send(result);
    })
})



// PUT Operatoin
router.put('/', (req, res) => {
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
router.delete('/', (req, res) => {
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
// function req_validation(body){
//     const schema = Joi.object({
//         name: Joi.string().min(3).required(),
//     })
//     return schema.validate(body)
// }

module.exports = router;