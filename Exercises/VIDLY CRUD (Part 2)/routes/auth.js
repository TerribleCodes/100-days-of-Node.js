const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // Whether the user is already registered
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid Email or Password...');

    // Here the `user` object has the `user.password` from the above operation
    const validPsswd = await bcrypt.compare(req.body.password, user.password);
    if (!validPsswd) return res.status(400).send('Invalid Email or Password...');

    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey') ); // Only the ID will be encoded
    // This token can be decoded in the JWT to get the payload information

    res.send(token);

});

function validate(req) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()
    });
  
    return schema.validate(req);
  }
module.exports = router;