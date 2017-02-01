const express = require("express");
const router = express.Router();
const knex = require("../knex");
const bcrypt = require("bcrypt-as-promised");
const generateToken = require("./generateToken.js");
const APP_SECRET = "SUPERSECRETAPPSECRET";

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
            console.log("user already exists");
            res.json("user already exists");
        }
    }).then((hashedPassword) => {
        if (!hashedPassword)
            return;

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

function getUser(username, email) {
    return knex("users")
        .select("*")
        .where("username", username)
        .orWhere("email", email).then((data) => {
            return data
        });
}

function hashPassword(passwordForHash, salt) {
    return bcrypt.hash(passwordForHash, salt).then((hashedPassword) => {
        return hashedPassword;
    });
}

function authenticateAndJWT(user) {
    if (user !== undefined) {
        var token = generateToken({
            id: user.id,
            username: user.username,
            email: user.email
        }, APP_SECRET);

        return {jwt: token, authenticated: true};
    } else {
        return {authenticated: false};
    }
}

module.exports = router;
