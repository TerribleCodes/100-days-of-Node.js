const asyncMiddleware = require('../middleware/async');
const adminAuth = require('../middleware/admin')
const auth = require('../middleware/auth')
const {Genre, validate} = require('../models/genre');
const express = require('express');
const winston = require('winston');
const router = express.Router();

winston.handleExceptions(
  new winston.transports.File({filename: 'exception.log'})
);
process.on('unhandledRejection', (ex) => {
  throw ex;
});

// process.on('uncaughtException', (ex) => {
  // console.log("Uncaught Exception...");
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

// process.on('unhandledRejection', (ex) => {
  // console.log("Unhandled Rejection...");
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

// Works - 18 Dec 2022
router.get('/', asyncMiddleware (async (req, res) => {
  const genre = await Genre.find().sort('name');
  res.send(genre);
  throw new Error('Could not get the Genre');
}));

throw new Error ('something failed during startup');

// Works - 18 Dec 2022
router.post('/', auth, asyncMiddleware( async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
}
));

// Works - 18 Dec 2022
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

// Works - 18 Dec 2022
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// Works - 18 Dec 2022
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

module.exports = router;