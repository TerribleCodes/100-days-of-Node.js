const winston = require('winston');
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();

require('winston-mongodb');
require('express-async-errors');
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/config')();

winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/vidly-database'});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));