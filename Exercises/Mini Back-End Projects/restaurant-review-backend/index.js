import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import RestaurantsDAO from './dao/restaurantsDAO.js'

dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.REST_REVIEWS_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    })
        .catch(err => {
            console.log(`error occured --> ${err}`);
            process.exit(1);
        })
        .then(async client => {
            await RestaurantsDAO.injectDB(client);
            app.listen(port, () => {
                console.log(`Listening on port ${port}`);
            });
        });