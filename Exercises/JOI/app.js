const express = require('express');
const {validateSignup} = require('./validator');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/signup', (req, res) => {
    const {error, value} = validateSignup(req.body);

    if (error){
        res.send(error.message);
        return;
    }else{
        res.send(
            `Successfully Signed Up...
            email: ${value.email}
            password: ---
        `);
    } 
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));