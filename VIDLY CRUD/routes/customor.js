const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Joi = require('joi');
const customerModel = require('../models/customer')
router.use(bodyParser.urlencoded({extended:true}));

router.get('/all', async (req, res) => {
    res.send(await customerModel.find().sort('name'));
});

router.post('/save', async (req, res) => {
    const {error} = req_validation(req.body);
    if (error) {
        res.send(error.message)
    }
    else{
        const newCustomer = new customerModel({isGold: req.body.isGold, name :req.body.name, phone: req.body.number});
        newCustomer.save((err,result) => { if (err) return res.send('Error occured when saving data...'); res.send(result); })
    }
});

router.put('/update/:id', async (req, res) => {
    const available = await customerModel.findById(req.params.id);
    if (available) {
        customerModel.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: { name:req.body.newName } },
            { upsert: true },
            (err, result) => {
                if (err) return console.log('Error occured when updating data...', err);
                res.send(result);
            })
    }
    else{
        res.status(404).send('Record is not available');
        return;
    }
});

router.delete('/delete/:id', async (req, res) => {
    const available = await customerModel.findById(req.params.id);
    if (available) {
        customerModel.findByIdAndDelete(
            { _id: req.params.id },
            (err, result) => {
                if (err) return console.log('Error occured...', err);
                res.send(result);
            })
    }
    else{
        res.status(404).send('Record is not available');
        return;
    } 
});


function req_validation(body){
    const schema = Joi.object({
        isGold: Joi.boolean().required(),
        name: Joi.string().min(3).required(),
        phone: Joi.number().min(10).required()
    })
    return schema.validate(body);
}
module.exports = router;