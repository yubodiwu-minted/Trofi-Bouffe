const express = require("express");
const router = express.Router();
const knex = require("../knex");

router.get("/:recipeId", (req, res) => {
    console.log(`get un-set nutrition facts for recipe ${req.params.recipeId} route hit`);

    knex("recipe_ingredients")
        .select("ingredients.id", "ingredients.name").join("recipes", "recipes.id", "recipe_ingredients.recipe_id")
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
    var ingredientToDbPromises = [];

    for (let ingredient of req.body) {
        var ingredientId = ingredient.ingredient_id;
        var nutritionFacts = ingredient.nutrition_facts;

        ingredientToDbPromises.push(knex("nutrition_facts").insert({
            ingredient_id: ingredientId,
            serving_quantity: nutritionFacts.nf_serving_size_qty,
            serving_unit: nutritionFacts.nf_serving_size_unit,
            serving_weight_grams: nutritionFacts.nf_serving_weight_grams,
            calories: nutritionFacts.nf_calories,
            calories_from_fat: nutritionFacts.nf_calories_from_fat,
            total_fat: nutritionFacts.nf_total_fat,
            saturated_fat: nutritionFacts.nf_saturated_fat,
            monounsaturated_fat: nutritionFacts.nf_monounsaturated_fat,
            polyunsaturated_fat: nutritionFacts.nf_polyunsaturated_fat,
            trans_fatty_acid: nutritionFacts.nf_trans_fatty_acid,
            cholesterol: nutritionFacts.nf_cholesterol,
            sodium: nutritionFacts.nf_sodium,
            total_carbohydrate: nutritionFacts.nf_total_carbohydrate,
            dietary_fiber: nutritionFacts.nf_dietary_fiber,
            sugars: nutritionFacts.nf_sugars,
            protein: nutritionFacts.nf_protein,
            vitamin_a_dv: nutritionFacts.nf_vitamin_a_dv,
            vitamin_c_dv: nutritionFacts.nf_vitamin_c_dv,
            calcium_dv: nutritionFacts.calcium_dv,
            iron: nutritionFacts.nf_iron_dv
        }));
    }

    Promise.all(ingredientToDbPromises);

    res.end()
})

module.exports = router;
