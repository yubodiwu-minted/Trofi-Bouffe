const express = require("express");
const router = express.Router();
const knex = require("../knex");
const JWT = require("jsonwebtoken");

const {
    isWeightUnit,
    isVolumeUnit,
    filterForWeightOrVolumeRequirement,
    combineNutritionFacts
} = require("../helpers.js");
const APP_SECRET = "SUPERSECRETAPPSECRET";

router.get("/:recipeId", (req, res) => {
    console.log(`get un-set nutrition facts for recipe ${req.params.recipeId} route hit`);

    knex.raw(`select i.id, i.name, ri.units, ri."hasVolume" as needsVolume, ri."hasWeight" as needsWeight, nf."hasWeight", nf."hasVolume" from recipe_ingredients as ri
    join recipes as r on r.id = ri.recipe_id
    join ingredients as i on i.id = ri.ingredient_id
    left outer join nutrition_facts_ingredients as nf on nf.ingredient_id = i.id
    where ri.units is not null and r.id = ${req.params.recipeId};`).then((data) => {
            console.log(data);
            var parsedData = data.rows.filter((row) => {
                if (row.needsvolume && !row.hasVolume) {
                    return true;
                } else if (row.needsweight && !row.hasWeight) {
                    return true;
                }
            })

            res.json(parsedData);
        }).catch((err) => {
            res.end(err)
        });
});

router.post("/", (req, res) => {
    console.log("nutrition facts post route hit");
    var ingredientToDbPromises = [];

    var user = JWT.verify(req.query.jwt, APP_SECRET);
    if (!user) res.end("verify failed");
    if (!user) throw new Error("failed verification");

    for (let ingredient of req.body) {
        let ingredientId = ingredient.ingredient_id;
        let nutritionFacts = ingredient.nutrition_facts;

        ingredientToDbPromises.push(
            knex("nutrition_facts_ingredients").select("item_id")
                .where("ingredient_id", ingredientId).then((data) => {
                    if (!data[0] || data[0].item_id !== nutritionFacts.item_id) {
                        return knex("nutrition_facts_ingredients").insert({
                            ingredient_id: ingredientId,
                            item_id: nutritionFacts.item_id,
                            hasVolume: isVolumeUnit(nutritionFacts.nf_serving_size_unit),
                            hasWeight: isWeightUnit(nutritionFacts.nf_serving_size_unit) || nutritionFacts.serving_weight_grams,
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
                        })
                    }
            }));
    }

    Promise.all(ingredientToDbPromises).then(() => {
        var recipeId = req.query.recipeId;

        return knex("recipes").select("ingredients.id", "ingredients.name", "recipe_ingredients.quantity as recipeQuantity", "recipe_ingredients.units as recipeUnits", "recipe_ingredients.hasWeight as needsWeight", "recipe_ingredients.hasVolume as needsVolume", "nutrition_facts_ingredients.*")
            .join("recipe_ingredients", "recipes.id", "recipe_ingredients.recipe_id").join("ingredients", "ingredients.id", "recipe_ingredients.ingredient_id")
            .join("nutrition_facts_ingredients", "nutrition_facts_ingredients.ingredient_id", "ingredients.id").where("recipes.id", req.query.recipeId)
            .then((data) => {
                var dataForConversion = filterForWeightOrVolumeRequirement(data);
                return combineNutritionFacts(dataForConversion);
            });
    }).then((cumulativeNutritionFacts) => {
        knex("recipes").where("recipes.id", "=", req.query.recipeId)
            .update({
                calories: Math.round(cumulativeNutritionFacts.calories)
            }).then(() => {
                console.log("recipe updated with calories");
            });

        knex("nutrition_facts_recipes").insert({
            recipe_id: req.query.recipeId,
            calories: cumulativeNutritionFacts.nf_calories,
            calories_from_fat: cumulativeNutritionFacts.nf_calories_from_fat,
            total_fat: cumulativeNutritionFacts.nf_total_fat,
            saturated_fat: cumulativeNutritionFacts.nf_saturated_fat,
            monounsaturated_fat: cumulativeNutritionFacts.nf_monounsaturated_fat,
            polyunsaturated_fat: cumulativeNutritionFacts.nf_polyunsaturated_fat,
            trans_fatty_acid: cumulativeNutritionFacts.nf_trans_fatty_acid,
            cholesterol: cumulativeNutritionFacts.nf_cholesterol,
            sodium: cumulativeNutritionFacts.nf_sodium,
            total_carbohydrate: cumulativeNutritionFacts.nf_total_carbohydrate,
            dietary_fiber: cumulativeNutritionFacts.nf_dietary_fiber,
            sugars: cumulativeNutritionFacts.nf_sugars,
            protein: cumulativeNutritionFacts.nf_protein,
            vitamin_a_dv: cumulativeNutritionFacts.nf_vitamin_a_dv,
            vitamin_c_dv: cumulativeNutritionFacts.nf_vitamin_c_dv,
            calcium_dv: cumulativeNutritionFacts.calcium_dv,
            iron: cumulativeNutritionFacts.nf_iron_dv
        }).then(() => {
            res.json(cumulativeNutritionFacts);
        });
    });
});

// select i.id, i.name, nf from recipes as r
// join recipe_ingredients as ri on r.id = ri.recipe_id
// join ingredients as i on i.id = ri.ingredient_id
// join nutrition_facts as nf on i.id = nf.ingredient_id
// where r.id = 1;

// knex("recipe_ingredients")
//     .select("ingredients.id", "ingredients.name", 'recipe_ingredients."hasVolume"').join("recipes", "recipes.id", "recipe_ingredients.recipe_id")
//     .join("ingredients", "ingredients.id", "recipe_ingredients.ingredient_id").leftOuterJoin("nutrition_facts", "nutrition_facts.ingredient_id", "ingredients.id")
//     .whereNull("nutrition_facts.ingredient_id").whereNotNull("recipe_ingredients.units").then((data) => {
//         console.log(data);
//         res.json(data);
//     }).catch((err) => {
//         res.end(err)
//     })

module.exports = router;
