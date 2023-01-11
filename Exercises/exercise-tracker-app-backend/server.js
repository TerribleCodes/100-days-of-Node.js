const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection extablished successfully');
});

app.use(cors());
app.use(express.json());

const userRouter = require('./routes/user');
const exerciseRouter = require('./routes/exercise');

app.use('/user', userRouter);
app.use('/exercise', exerciseRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});