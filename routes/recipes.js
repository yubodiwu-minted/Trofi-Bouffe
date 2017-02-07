const express = require("express");
const router = express.Router();
const knex = require("../knex");
const JWT = require("jsonwebtoken");
const APP_SECRET = "SUPERSECRETAPPSECRET";

router.get("/", (req, res) => {
    console.log("recipes index route hit");

    try {
        var user = JWT.verify(req.query.jwt, APP_SECRET);
    } catch(err) {
        console.error(err);
    }

    if (user) {
        knex("recipes").select("*")
            .where("user_id", user.id).then((recipes) => {
                console.log("does this happen?");
                console.log(recipes);
                res.json(recipes)
            })
    } else {
        res.error("failed")
    }
});

router.post("/", (req, res) => {
    console.log("recipes post route hit");
    console.log(req.body);
    res.end();
})

module.exports = router;
