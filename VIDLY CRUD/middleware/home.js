const express = require('express')
const router = express.Router();

// Root folder implementation
router.get('/',(req,res) => {
    // res.send("This is the root folder");
    res.render('index.pug', {
        title: "test",
        message: "test 1"
    })
});

module.exports = router;