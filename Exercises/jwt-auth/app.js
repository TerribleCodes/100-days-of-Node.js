const cookieParser = require('cookie-parser');
const {createTokens, validateToken} = require('./jwt');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('Successfully connected to the database...'))
    .catch((error) => console.log('Error occured...'))

app.post('/register', (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((result_hash) => { 
        const userData = new userModel();
        userData.username = username;
        userData.password = result_hash;
        userData.save((err, result) => {
            if (err) return console.log('Error occured...');
            res.json(`User Registered --> ${result}`);   
            });
        });
    });

app.post('/login', async (req, res) => {
    const {username, password} = req.body; // Get the username and the password
    const user = await userModel.findOne({username: username}); // Find the user in the database using the username
    if(!user) res.status(400).json({error: 'User does not exist'}); // Checking whether user exists
    const dbPass = user.password; //Get the password from the database
    bcrypt.compare(password, dbPass).then((result) => { // Compares the sent password with the hashed value
        if(!result){
            res
                .status(400)
                .json({error: 'Wrong Password'})
        }else{
            const accessToken = createTokens(user);
            res.json({accessToken});
            // Cookie isn't working so just sent the token to the output
            // res.cookie('access-token', accessToken, { maxAge: 900000, httpOnly: true });
        }
    });
});

app.get('/profile', validateToken, (req, res) => {
    res.json('done');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});