const express = require("express");
const router = express.Router();
const knex = require("../knex");
const JWT = require("jsonwebtoken")
const APP_SECRET = "SUPERSECRETAPPSECRET";

router.get("/", (req, res) => {
    console.log("recipes index route hit");

    try {
        var verified = JWT.verify(req.query.jwt, APP_SECRET);
    } catch(err) {
        console.log("does this happen?");
        console.error(err);
    }

    console.log("verified", verified);
    res.end();
});

module.exports = router;
