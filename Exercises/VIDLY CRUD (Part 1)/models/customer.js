const mongoose = require('mongoose');

/**
 *  Customer
 *  ~ Customer Name
 *  ~ Customer's phone number 
 *  ~ isGold boolean value
 */

const customerSchema = new mongoose.Schema({
    isGold: {type:Boolean, default:true},
    name: String,
    phone: Number
});

const customerModel = mongoose.model( 'customer', customerSchema );

module.exports = { customerModel, customerSchema };