const express = require('express')
const router = express.Router();

// Root folder implementation
router.get('/',(req,res) => {
    // res.send("This is the root folder");
    res.render('index.pug', {
        title: "Blank Page",
        message: "No content available here..."
    })
});

module.exports = router;