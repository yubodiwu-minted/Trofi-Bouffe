const express = require('express');
const router = express.Router();
const knex = require("../knex");

/* GET users listing. */
router.get("/", function(req, res, next) {
    console.log("users get / route is hit");
    // res.send("balls");
    res.render('../views/index.ejs')
});

router.post("/", function(req, res) {
    console.log("users post / route is hit");

    knex("users").insert({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        hashed_password: req.body.password
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
});

module.exports = router;
