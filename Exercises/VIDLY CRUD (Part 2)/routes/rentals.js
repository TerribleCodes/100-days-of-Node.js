const { validate, rentalSchema} = require('../models/rentals'); 
const {Movie} = require('../models/movie'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const fawn = require('fawn');
fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await rentalSchema.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.CustomerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new rentalSchema({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  try{
    new fawn.Task()
      // .save(collection_name, document_name)
      .save('rentals', rental)
      .update('movies', {_id: movie._id}, {
        $inc: {numberInStock: -1}
      })
      .run();
  res.send(rental);
  }
  catch(err){
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  const rental = await rentalSchema.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 

// Somehow it works lol 