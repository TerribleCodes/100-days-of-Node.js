const express = require('express');
const Joi = require('joi');
const joi = require('joi');
const AppError = require('./AppError');
const { INVAVLID_SUBSCRIPTION } = require('./constants/constants');
const errorHandler = require('./middleware/error');
const { tryCatch } = require('./utils/try-catch');
const app = express();
const PORT = 3000;

const getUser = () => undefined;
const getSubscription = () => undefined;

app.get(
    '/test', 
    tryCatch(async (req, res) => {
        const user = getUser();
        if(!user){
            throw new Error('User not found'); // An error will be thrown under the specified condition
        }
        return res.status(200).json({success: true});
    })
)

const schema = joi.object({
    userId: Joi.number().required()
})

app.post(
    '/login', 
    tryCatch (
        async (req, res,) => {
            const {error, value} = schema.validate({});
            // if(error) throw error;
            const sub = getSubscription();
            if(!sub){
                throw new AppError(INVAVLID_SUBSCRIPTION, 'subscription not found', 400);
            }
        }
    )
);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));