const mongoose = require('mongoose');

/**
 * Generes
 *  ~ Name of the movie
 *  ~ Genere the movie belongs to
 */

const genereSchema = new mongoose.Schema({
        name:{ type: String, required: true, minlength: 1, maxlength: 50 },
        genere: { type: String, required: true, minlength: 1, maxlength: 50, message: 'must' }
    });
    
const genereModel = mongoose.model('generes', genereSchema);

module.exports = { genereModel, genereSchema };