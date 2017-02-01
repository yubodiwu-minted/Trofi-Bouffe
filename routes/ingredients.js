const express = require("express");
const router = express.Router();
const knex = require("../knex");
const JWT = require("jsonwebtoken");
const APP_SECRET = "SUPERSECRETAPPSECRET";

router.get("/:id", function(req, res) {
    console.log("get ingredients by recipe id route hit");

    res.end();
});

module.exports = router;
