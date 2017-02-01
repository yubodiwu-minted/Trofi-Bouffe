const express = require("express");
const router = express.Router();
const knex = require("../knex");
const JWT = require("jsonwebtoken")
const APP_SECRET = "SUPERSECRETAPPSECRET";

router.get("/", (req, res) => {
    console.log("recipes index route hit");

    try {
        var user = JWT.verify(req.query.jwt, APP_SECRET);
    } catch(err) {
        console.error(err);
    }

    if (verified) {
        knex("recipes")
    }
});

module.exports = router;
