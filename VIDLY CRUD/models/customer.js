const mongoose = require('mongoose');

const customerModel = mongoose.model(
    'customer',
    new mongoose.Schema({
        isGold: {type:Boolean, default:true},
        name: String,
        phone: Number
    })
);

module.exports = customerModel;