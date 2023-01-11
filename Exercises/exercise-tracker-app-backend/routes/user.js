const router = require('express').Router();

const User = require('../models/user.model');

router.get('/', async (req, res) => {
    await User.find().exec((error, result)=>{
        if(error) return res.status(400).json('Error Occured');
        res.json(result);
    });
});

router.post('/add', async (req, res) => {
    const {username} = req.body;
    const newUser = new User({username});

    await newUser.save((error, result)=>{
        if (error) return res.status(400).json('Error Occured');
        res.json(result);
    });
});

module.exports = router;