const express = require("express");
const router = express.Router();
const knex = require("../knex");

router.get("/:recipeId", (req, res) => {
    console.log(`get un-set nutrition facts for recipe ${req.params.recipeId} route hit`);

    knex("recipe_ingredients")
        .select("ingredients.name").join("recipes", "recipes.id", "recipe_ingredients.recipe_id")
        .join("ingredients", "ingredients.id", "recipe_ingredients.ingredient_id").leftOuterJoin("nutrition_facts", "nutrition_facts.ingredient_id", "ingredients.id")
        .whereNull("nutrition_facts.ingredient_id").then((data) => {
            console.log(data);
            res.json(data);
        }).catch((err) => {
            res.error(err)
        })
});

router.post("/", (req, res) => {
    console.log("nutrition facts post route hit");
    console.log("body is ", req.body);
    res.end()
})

module.exports = router;
