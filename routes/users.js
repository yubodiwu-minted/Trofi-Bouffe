const express = require("express");
const router = express.Router();
const knex = require("../knex");
const bcrypt = require("bcrypt-as-promised");
const {
    generateToken,
    getUser,
    hashPassword,
    authenticateAndJWT
} = require("./users_helpers.js");

router.get("/", function(req, res, next) {
    console.log("users get / route is hit");
    res.render("../views/index.ejs")
});

router.post("/", function(req, res) {
    console.log("users post / route is hit");

    getUser(req.body.username, req.body.email).then((data) => {
        if (data.length === 0) {
            return hashPassword(req.body.password, 12);
        } else {
            throw new Error("user already exists");
        }
    }).then((hashedPassword) => {
        return knex("users")
            .insert({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                username: req.body.username,
                hashed_password: hashedPassword
            }).then(() => {
                return getUser(req.body.username, req.body.email);
            });
    }).then((user) => {
        res.json(authenticateAndJWT({
            id: user[0].id,
            username: user[0].username,
            email: user[0].email
        }));
    }).catch((error) => {
        res.end("user already exists");
        console.error(error);
    });
});

router.post("/login", function(req, res) {
    console.log("users log in route hit");

    getUser("", req.body.email).then((user) => {
        return bcrypt.compare(req.body.password, user[0].hashed_password).then(() => {
            return user[0]
        }).catch(() => {
            return undefined;
        });
    }).then((user) => {
        var authentication = authenticateAndJWT(user);
        res.json(authentication);
    }).catch((error) => {
        console.log(error);
    })
});

module.exports = router;
