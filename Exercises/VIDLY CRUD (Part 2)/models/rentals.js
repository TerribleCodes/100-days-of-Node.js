const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.model('rentals', new mongoose.Schema({
    customer: new mongoose.Schema({
        name:{ type: String, required: true, minlength: 5, maxlength: 50 },
        isGold:{ type: Boolean, required: true }, 
        phone:{ type: String, required: true }
    }),
    movie: new mongoose.Schema({
        title: { type: String, required: true, trim: true, minlength: 5, maxlength: 50 },
        dailyRentalRate: { type: Number, required: true, min: 0, max: 255 }
    }),
    dateOut: { type: Date, required: true, default: Date.now },
    dateReturned: {type: Date },
    rentalFee: { type: Number, min: 0 }
}))

function validate(rental){
    const Schema = Joi.object({
        CustomerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return Schema.validate(rental);
}

module.exports = {rentalSchema, validate}