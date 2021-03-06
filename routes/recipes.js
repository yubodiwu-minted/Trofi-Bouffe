const express = require("express");
const router = express.Router();
const knex = require("../knex");
const JWT = require("jsonwebtoken");
const APP_SECRET = "SUPERSECRETAPPSECRET";

const {isWeightUnit, isVolumeUnit} = require("../helpers.js");

router.get("/", (req, res) => {
    console.log("recipes index route hit");

    try {
        var user = JWT.verify(req.query.jwt, APP_SECRET);
    } catch(err) {
        console.error(err);
    }

    if (user) {
        knex("recipes").select("recipes.*", "users.username")
            .join("users", "users.id", "=", "recipes.user_id")
            .where("recipes.user_id", user.id).then((recipes) => {
                console.log(recipes);
                res.json(recipes)
            })
    } else {
        res.error("failed")
    }
});

router.get("/all", function(req, res) {
    knex("recipes").select("recipes.*", "users.username")
        .join("users", "users.id", "=", "recipes.user_id")
        .then((recipes) => {
            res.json(recipes);
        });
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
                        recipeIngredientForInsert.hasWeight = isWeightUnit(ingredient.units);
                        recipeIngredientForInsert.hasVolume = isVolumeUnit(ingredient.units);
                    }
                }

                return recipeIngredientForInsert;
            });

            knex("recipe_ingredients").insert(recipeIngredientsForInsert)
                .then(() => {
                    console.log("recipe ingredients relation inserted");
                });
        })

    res.end();
});

router.put("/", (req, res) => {
    console.log("put recipes route hit");

    try {
        var user = JWT.verify(req.body.jwt, APP_SECRET);
    } catch (err) {
        console.error(err);
    }

    if (!user) throw new Error("failed verification");

    var notInserted = [];
    var ingredientsForInsert = req.body.ingredientsList.map((ingredient) => {
        console.log(ingredient);
        if (!ingredient.id) {
            return {
                name: ingredient.name
            };
        } else {
            notInserted.push({
                recipe_id: req.body.currentRecipe.id,
                ingredient_id: ingredient.id,
                quantity: ingredient.quantity,
                units: ingredient.units,
                hasWeight: ingredient.units ? isWeightUnit(ingredient.units) : null,
                hasVolume: ingredient.units ? isVolumeUnit(ingredient.units) : null
            });
        }
    }).filter((ingredient) => ingredient);

    Promise.all([
        knex("recipes").where("id", req.body.currentRecipe.id)
        .update({
            name: req.body.currentRecipe.name,
            img: req.body.currentRecipe.img,
            servings: req.body.currentRecipe.servings
        }).then(() => {
            console.log("recipe info updated");
        }),
        knex("ingredients").insert(ingredientsForInsert)
        .returning(["id", "name"]).then((ingredientData) => {
            console.log("ingredientData is ", ingredientData instanceof Array);
            if (ingredientData instanceof Array) {
                var recipeIngredientsForInsert = ingredientData.map((recipeIngredient) => {
                    var recipeIngredientForInsert = {
                        recipe_id: req.body.currentRecipe.id,
                        ingredient_id: recipeIngredient.id
                    };

                    for (let ingredient of req.body.ingredientsList) {
                        if (ingredient.name === recipeIngredient.name) {
                            recipeIngredientForInsert.quantity = ingredient.quantity;
                            recipeIngredientForInsert.units = ingredient.units;
                            recipeIngredientForInsert.hasWeight = isWeightUnit(ingredient.units);
                            recipeIngredientForInsert.hasVolume = isVolumeUnit(ingredient.units);
                        }
                    }

                    return recipeIngredientForInsert;
                }).concat(notInserted);
            } else {
                var recipeIngredientsForInsert = notInserted;
            }


            knex("recipe_ingredients").where("recipe_id", req.body.currentRecipe.id)
                .del().then(() => {
                    knex("recipe_ingredients")
                        .insert(recipeIngredientsForInsert)
                        .then(() => {
                            console.log("recipe ingredients relation inserted");
                        });
                });
        }),
        knex("recipe_directions").where("recipe_id", req.body.currentRecipe.id)
        .del().then(() => {
            var recipeDirectionsForInsert = req.body.directions.map((direction) => {
                return {
                    recipe_id: req.body.currentRecipe.id,
                    step_number: direction.stepNumber,
                    step_content: direction.stepContent
                };
            });

            knex("recipe_directions").insert(recipeDirectionsForInsert)
                .then(() => {
                    console.log("recipe directions inserted");
                });
        })
    ])

    res.end();
});

router.delete("/", function(req, res) {
    console.log("delete recipe route hit");

    try {
        var user = JWT.verify(req.query.jwt, APP_SECRET);
        var currentRecipe = JSON.parse(req.query.currentRecipe);
    } catch (err) {
        console.error(err);
    }

    if (!user) throw new Error("failed verification");

    knex("recipes").where("id", currentRecipe.id)
        .andWhere("user_id", user.id).del()
        .then((data) => {
            console.log(data);
            res.send(`recipe ${currentRecipe.id} deleted`)
        })
});

module.exports = router;
