const express = require("express");
const router = express.Router();
const knex = require("../knex");
const bcrypt = require("bcrypt-as-promised");

router.get("/", function(req, res, next) {
    console.log("users get / route is hit");
    res.render("../views/index.ejs")
});

router.post("/", function(req, res) {
    console.log("users post / route is hit");

    getPasswordForUser(req.body.username, req.body.email)
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
            res.send(data);
        })
        .catch((error) => {
            console.error(error);
        });
});

router.post("/login", function(req, res) {
    console.log("users log in route hit");

    getPasswordForUser("", req.body.email)
        .then((user) => {
            return {
                loggedIn: bcrypt.compare(req.body.password, user[0].hashed_password),
                userId: user[0].id
            };
        })
        .then((data) => {
            if (data.loggedIn) {
                res.json({
                    id: data.userId,
                    authenticated: true
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
});

function getPasswordForUser(username, email) {
    return knex("users")
        .select("hashed_password", "id")
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
