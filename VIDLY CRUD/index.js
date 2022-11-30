const opt = require('debug')('app:startup'); // console.log alternative 
const express = require('express'); // Express import
const app = express(); // Express
const logger = require('./middleware/logger'); // Custom middleware

// Template Engines
// app.set('view engine', 'pug');
// app.set('views', './views');

// Import routes
const generes = require('./routes/genere');
app.use('/movies/generes/', generes);

// Import home page
const home = require('./middleware/home');
app.use('/',home);

// Middlewares in the pipeline
app.use(express.json());
app.use(logger);

// Reads the `http://localhost:3000/readme.md`
app.use(express.static('public'));

// Connection
const port = process.env.PORT || 3000;
app.listen(port, () => opt(`Listening to port ${port}`));