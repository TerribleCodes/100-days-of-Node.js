const router = require('express').Router();

const Exercise = require('../models/exercise.model');

router.get('/', async (req, res) => {
    await Exercise.find().exec((error, result)=>{
        if(error) return res.status(400).json(error);
        res.json(result);
    });
});

router.post('/add', async (req, res) => {
    const {username, description, duration, date} = req.body;

    const newExercise = new Exercise({
        username, description, duration, date
    });
    await newExercise.save((error, result) => {
        if (error) return res.status(400).json({error});
        res.json(result);
    });
});

router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id, (err, result) => {
        if (err) return res.status(400).json(err);
        res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) return res.status(400).json(err);
        res.json(result);
    });
});

router.post('/update/:id', (req, res) => {
    Exercise.findByIdAndUpdate(
        {_id: req.params.id},
        {
            $set: {
                username: req.body.username,
                description: req.body.description,
                duration: req.body.duration,
                date: req.body.date
            }
        },
        {upsert: true},
        (err, result) => {
            if (err) return res.status(400).json(err.message);
            res.json(`Successfully Updated ${result}`);
        }
    )
});

module.exports = router;