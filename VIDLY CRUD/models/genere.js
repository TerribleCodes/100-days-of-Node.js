const mongoose = require('mongoose');

const genereModel = mongoose.model(
    'generes', 
    new mongoose.Schema({
        name:{ type: String, required: true, minlength: 1, maxlength: 50 },
        genere: { type: String, required: true, enum: ['comedy', 'horror', 'fantasy', 'none', 'perfection', 'romance', 'cartoon'], minlength: 1, maxlength: 50, message: 'must' }
    })
);

module.exports = genereModel;