const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/register', (req, res) => {
    res.json('register');
});

app.post('/login', (req, res) => {
    res.json('Log In');
});

app.get('/profile', (req, res) => {
    res.json('profile');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});