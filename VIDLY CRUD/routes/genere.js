const express = require('express')
const mongoose = require('mongoose');
const { bookModel } = require('../../mongo-demo/mongoose crud/book_model');
const router = express.Router();

const genereSchema = new mongoose.Schema({
    name:{ type: String, required: true, minlength: 5, maxlength: 50 },
    genere: { type: String, required: true, enum: ['comedy', 'horror', 'fantasy', 'none', 'perfection'], minlength: 5, maxlength: 50, message: 'must' }
});

const genereModel = mongoose.model('generes', genereSchema);

async function insertData(){
    const inputData = new genereModel({name: "Interstellar",genere: "perfection"});
    try{
        console.log(await inputData.save());
        // await inputData.validate(); // This can be used just to validate the data. Returns a promise but void.
    }
    catch(err){console.log(err.message)}
};
// insertData()

router.get('/all', async (req, res) => {
    res.send(await genereModel.find().sort('name'));
});

router.get('/:name', (req, res) => {
    genereModel.findOne({ name: req.params.name })
        .exec((err, result) => {
            if (err) return console.log('Error occured...', err);
            res.send(result);
        })
});

router.put('/:id', (req, res) => {
    genereModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        (err, result) => {
            if (err) return console.log("Error occured...", err);
            res.send(result);
        }
    )
})



// PUT Operatoin
// router.put('/', (req, res) => {
//     // Check whether the movie name is available
//     const movie_valid = movie.find(c => c.name === req.body.name);
//     if (!movie_valid) return res.status(404).send('Record is not available');
//     let index_of_movie = movie.indexOf(movie_valid);
//     const {error} =  req_validation(req.body)
//     // Usage of result.error --> {error}
//     if (error) return res.status(400).send(error);
//     movie[index_of_movie].name = req.body.name;
//     movie[index_of_movie].genere = req.body.genere;
//     res.send(movie);
// });

// DELETE Operation
// router.delete('/', (req, res) => {
//     // Validate the record is available
//     const movie_valid = movie.find(c => c.name === req.body.name);
//     if (!movie_valid) return res.status(404).send('Record is not available');
//     // Get the index of the record
//     let index_of_movie = movie.indexOf(movie_valid);
//     // Input validation
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     })
//     const {error} = schema.validate(req.body);
//     if (error) return res.status(400).send(error);
//     movie.splice(index_of_movie, 1);
//     res.send(movie);
// })

// Reuse input validation function
// function req_validation(body){
//     const schema = Joi.object({
//         name: Joi.string().min(3).required(),
//     })
//     return schema.validate(body)
// }

module.exports = router;