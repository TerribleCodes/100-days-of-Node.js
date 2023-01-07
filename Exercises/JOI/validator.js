const Joi = require('joi');

// A function that takes the schema then the req.body as the payload where the req.body gets validated 
const validator = (schema) => (payload) => schema.validate(payload, {abortEarly: false});

// Validation Schema
const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required(),
    confirmPassword: Joi.ref("password")
});

exports.validateSignup = validator(signupSchema);