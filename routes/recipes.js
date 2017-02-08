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
                res.json(recipes)
            })
    } else {
        res.error("failed")
    }
});

router.post("/", (req, res) => {
    console.log("recipes post route hit");
    var recipeId;

    try {
        var user = JWT.verify(req.body.jwt, APP_SECRET);
    } catch (err) {
        console.error(err);
    }

    knex("recipes")
        .insert({
            user_id: user.id,
            name: req.body.currentRecipe.name,
            servings: req.body.currentRecipe.servings,
            img: req.body.currentRecipe.img
        }).returning("id").then((data) => {
            recipeId = data[0];
            var ingredientsForInsert = req.body.ingredientsList.map((ingredient) => {
                return {
                    name: ingredient.name
                };
            });
            console.log(req.body.ingredientsList);
            knex("recipe_directions").insert(req.body.directions.map((direction) => {
                return {
                    recipe_id: recipeId,
                    step_number: direction.stepNumber,
                    step_content: direction.stepContent
                };
            })).then((data) => {
                console.log("directions added to database");
            });

            return knex("ingredients").insert(ingredientsForInsert)
                .returning(["id", "name"])
        }).then((ingredients) => {
            var recipeIngredientsForInsert = ingredients.map((recipeIngredient) => {
                var recipeIngredientForInsert = {
                    recipe_id: recipeId,
                    ingredient_id: recipeIngredient.id
                };

                for (let ingredient of req.body.ingredientsList) {
                    if (ingredient.name === recipeIngredient.name) {
                        recipeIngredientForInsert.quantity = ingredient.quantity;
                        recipeIngredientForInsert.units = ingredient.units;
                    }
                }

                return recipeIngredientForInsert;
            });

            console.log(recipeIngredientsForInsert);

            return knex("recipe_ingredients").insert(recipeIngredientsForInsert);
        })
    console.log(user);
    res.end();
})

module.exports = router;
