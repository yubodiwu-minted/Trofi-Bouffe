const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("route hit");
    // res.send("balls");
    res.render('../views/index.ejs')
});

module.exports = router;
