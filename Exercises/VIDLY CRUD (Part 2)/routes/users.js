const auth = require('../middleware/auth')
const {User, validateUser} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // Whether the user is already registered
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User Already Exists...');

    user = new User (
        // { name: req.body.name, email: req.body.email, password: req.body.password  }
        // Instead of using the above approach we can use the pick method
        _.pick(req.body, ['name', 'email', 'password'])
        );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    // Here we send the token inside the HTTP header
    // const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router;