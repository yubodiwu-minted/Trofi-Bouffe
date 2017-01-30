const express = require("express");
const router = express.Router();
const knex = require("../knex");
const bcrypt = require("bcrypt-as-promised")

/* GET users listing. */
router.get("/", function(req, res, next) {
    console.log("users get / route is hit");
    res.render("../views/index.ejs")
});

router.post("/", function(req, res) {
    console.log("users post / route is hit");

    bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
        return hashedPassword;
    })
    .then((hashedPassword) => {
        return knex("users").insert({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            hashed_password: hashedPassword
        });
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = router;
