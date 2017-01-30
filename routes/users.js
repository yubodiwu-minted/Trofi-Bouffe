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

    checkDBForUser(req.body.username, req.body.email)
    .then((data) => {
        if (data.length === 0) {
            return hashPassword(req.body.password, 12);
        } else {
            res.end("user already exists");
        }
    })
    .then((hashedPassword) => {
        if (!hashedPassword) return;

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
        console.error(error);
    });
});

function checkDBForUser(username, email) {
    return knex("users")
        .select("id")
        .where("username", username)
        .orWhere("email", email)
        .then((data) => {
            return data
        });
}

function hashPassword(passwordForHash, salt) {
    return bcrypt.hash(passwordForHash, salt)
        .then((hashedPassword) => {
            return hashedPassword;
        });
}

module.exports = router;
