const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Joi = require('joi');
const { genereModel } = require('../models/genere')
router.use(bodyParser.urlencoded({extended:true}));

router.get('/all', async (req, res) => {
    res.send(await genereModel.find().sort('name'));
});

router.post('/save', async (req, res) => {
    const {error} = req_validation(req.body);
    if (error) {
        res.send(error.message)
    }
    else{
        const newGenere = new genereModel({name: req.body.name, genere :req.body.genere});
        newGenere.save((err,result) => { if (err) return res.send('Error occured when saving data...'); res.send(result); })
    }
});

router.put('/update/:id', async (req, res) => {
    const available = await genereModel.findById(req.params.id);
    if (available) {
        genereModel.findByIdAndUpdate(
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
    const available = await genereModel.findById(req.params.id);
    if (available) {
        genereModel.findByIdAndDelete(
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
        name: Joi.string().min(3).required(),
        genere: Joi.string().min(3).required()
    })
    return schema.validate(body);
}

module.exports = router;