const express = require("express");
const router = express.Router();
const knex = require("../knex");
const JWT = require("jsonwebtoken");
const APP_SECRET = "SUPERSECRETAPPSECRET";

router.get("/:id", function(req, res) {
    console.log("get ingredients by recipe id route hit");
    console.log(req.params);

    knex("ingredients").join("recipe_ingredients", "ingredients.id", "=", "recipe_ingredients.ingredient_id")
        .select("ingredients.name", "quantity", "units")
        .where("recipe_ingredients.recipe_id", req.params.id).then((data) => {
            res.json(data);
        }).catch((err) => {
            console.error(err);
            res.end();
        })
});

module.exports = router;
